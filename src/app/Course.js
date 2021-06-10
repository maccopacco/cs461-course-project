import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listCourses, listEnrollRequests} from "../graphql/queries";
import {displayError, userFullName} from "./Utilities";
import {createEnrollRequest, deleteEnrollRequest} from "../graphql/mutations";
import {toast} from "react-toastify";
import {InstructorOptions, RegistrarOptions, StudentOptions} from "./Options";
import {checkIfDepartmentHead} from "./InstructorCreateCourseRequest";

export function loadCourses(context) {
    context.setState({data: null})
    API.graphql(graphqlOperation(listCourses))
        .then(function (data) {
            let courses = data.data.listCourses.items
            courses = courses.map(function (value) {
                value.combined_name = `${value.department.name} ${value.name}`
                value.instructor_name = value.instructor ? userFullName(value.instructor) : "No instructor"
                return value
            })
            context.setState({data: courses, studentOptions: 0, instructorOptions: 0, registrarOptions: 0})
        }).catch(function (e) {
        displayError("Could not load courses", e)
    })
}

export function enrollInCourse(context, course, enroll) {
    API.graphql(graphqlOperation(listEnrollRequests))
        .then(function (data) {
            const enrolls = data.data.listEnrollRequests.items
            const alreadyExists = enrolls.some(enrolled => enrolled.course.id === course.id
                && enrolled.school_user.id === context.props.user.id)
            if (alreadyExists) {
                displayError("Already have enroll request for this class")
                return
            }
            API.graphql(graphqlOperation(createEnrollRequest, {
                input: {
                    is_enrolling: enroll,
                    enrollRequestCourseId: course.id,
                    enrollRequestSchool_userId: context.props.user.id
                }
            })).then(function () {
                toast.info("Request made")
            }).catch(e => displayError("Could not make request", e))
        }).catch(e => displayError("Could not get enroll requests", e))
}

export function loadCourseEnrollRequestsStudent(context) {
    context.setState({data: null, studentOptions: StudentOptions.SHOW_COURSE_REQUESTS})
    loadCourseEnrollRequests(context, function (value) {
        // return true
        return value.school_user.id === context.props.user.id
    })
}

export function loadCourseEnrollRequestsInstructor(context) {
    context.setState({data: null, instructorOptions: InstructorOptions.SHOW_COURSE_REQUESTS})
    checkIfDepartmentHead(context, function (myDepartments) {
        loadCourseEnrollRequests(context, function (value) {
            return myDepartments.map(v => v.id).includes(value.course.department.id)
        })
    }, function () {
        loadCourseEnrollRequests(context, function (value) {
            return value.course.instructor.id === context.props.user.id
        })
    })
}

export function loadCourseEnrollRequestsRegistrar(context) {
    context.setState({data: null, registrarOptions: RegistrarOptions.SHOW_COURSE_REQUESTS})
    loadCourseEnrollRequests(context)
}

export function loadCourseEnrollRequests(context, filter = function () {
    return true
}) {
    API.graphql(graphqlOperation(listEnrollRequests))
        .then(function (data) {
            let requests = data.data.listEnrollRequests.items
            requests = requests.filter(filter)
            requests = requests.map(function (value) {
                value.course_name = `${value.course.department.name} ${value.course.name}`
                value.section = value.course.section
                value.join_leave = value.is_enrolling ? "Join" : "Leave"
                value.user_name = userFullName(value.school_user)
                value.user_type = value.school_user.user_type
                return value
            })
            context.setState({data: requests})
        }).catch(e => displayError("Could not load course enroll requests", e))
}

export function deleteCourseEnrollRequest(context, row, redraw) {
    let me = context.props.user;
    if (me.user_type === "REGISTRAR") {
        del(context, row, redraw)
    } else if (me.id === row.school_user.id) {
        del(context, row, redraw)
    } else {
        displayError("No permissions to delete that...")
    }
}

function del(context, row, redraw) {
    API.graphql(graphqlOperation(deleteEnrollRequest, {
        input: {
            id: row.id
        }
    })).then(function () {
        toast.info("Deleted")
        redraw()
    }).catch(e => displayError("Could not delete request", e))
}