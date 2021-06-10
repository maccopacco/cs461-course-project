import {InstructorOptions} from "./Options";
import {loadCourseCreateRequests, loadCourseDeleteRequests} from "./CourseRequestsLoading";
import {checkIfDepartmentHead} from "./InstructorCreateCourseRequest";
import {toast} from "react-toastify";
import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listDeleteCourseRequests} from "../graphql/queries";
import {createDeleteCourseRequest, deleteCreateCourseRequest, deleteDeleteCourseRequest} from "../graphql/mutations";
import {displayError} from "./Utilities";


export function instructorViewCourseCreateRequest(context) {
    checkIfDepartmentHead(context, function (departments) {
        const ids = departments.map(v => v.id)
        context.setState({instructorOptions: InstructorOptions.VIEW_CREATE_COURSE_REQUESTS, data: []})

        loadCourseCreateRequests(context, function (value) {
            return ids.includes(value.course_department.id)
        })
    })
}

export function instructorViewCourseDeleteRequest(context) {
    checkIfDepartmentHead(context, function (departments) {
        const ids = departments.map(v => v.id)
        context.setState({instructorOptions: InstructorOptions.VIEW_DELETE_COURSE_REQUESTS, data: []})

        loadCourseDeleteRequests(context, function (value) {
            return ids.includes(value.course.department.id)
        })
    })
}

export function instructorAttemptDeleteCourse(context, row) {
    checkIfDepartmentHead(context, function (departments) {
        if (!departments.map(v => v.id).includes(row.department.id)) {
            toast.info("Not authorized to delete that class")
            return
        }
        API.graphql(graphqlOperation(listDeleteCourseRequests))
            .then(function (data) {
                const courses =
                    data.data.listDeleteCourseRequests.items
                        .map(function (value) {
                            return value.course.id
                        })
                if (courses.includes(row.id)) {
                    toast.info("Deletion already requested")
                    return
                }
                API.graphql(graphqlOperation(createDeleteCourseRequest, {
                    input: {
                        deleteCourseRequestCourseId: row.id,
                        deleteCourseRequestHead_instructorId: context.props.user.id
                    }
                })).then(function () {
                        toast.info("Delete request made")
                    }
                ).catch(function (e) {
                    displayError("Delete request not made", e)
                })

            }).catch(function (e) {
            displayError("Could not check it wasn't already deleted", e)
        })
    })
}


export function instructorCancelCreateCourse(context, row) {
    checkIfDepartmentHead(context, function (departments) {
        if (!departments.map(v => v.id).includes(row.course_department.id)) {
            toast.info("Not authorized to delete that class")
            return
        }
        API.graphql(graphqlOperation(deleteCreateCourseRequest, {
            input: {
                id: row.id
            }
        })).then(function () {
            toast.info("Cancelled request")
            instructorViewCourseCreateRequest(context)
        }).catch(e => displayError("Could not cancel creating class", e))
    })
}

export function instructorCancelDeleteCourse(context, row) {
    checkIfDepartmentHead(context, function (departments) {
        if (!departments.map(v => v.id).includes(row.course.department.id)) {
            toast.info("Not authorized to cancel deletion of that class")
            return
        }
        API.graphql(graphqlOperation(deleteDeleteCourseRequest, {
            input: {
                id: row.id
            }
        })).then(function () {
            toast.info("Cancelled request")
            instructorViewCourseDeleteRequest(context)
        }).catch(e => displayError("Could not cancel deleting class", e))
    })
}


