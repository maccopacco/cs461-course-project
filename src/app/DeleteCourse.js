import {RegistrarOptions} from "./Options";
import {loadCourseDeleteRequests} from "./CourseRequests";
import {checkIfDepartmentHead} from "./InstructorCreateCourseRequest";
import {toast} from "react-toastify";
import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listDeleteCourseRequests} from "../graphql/queries";
import {createDeleteCourseRequest, deleteCourse, deleteDeleteCourseRequest} from "../graphql/mutations";
import {displayError} from "./Utilities";

export function registarShowDeleteCourseRequests(context) {
    context.setState({registrarOptions: RegistrarOptions.VIEW_DELETE_COURSE_REQUESTS, data: []})
    loadCourseDeleteRequests(context)
}

export async function registrarApproveDeleteCourseRequest(context, item) {
    if (await registrarDeleteDeleteCourseRequest(context, item)) {
        API.graphql(graphqlOperation(deleteCourse, {
            input: {
                id: item.course.id
            }
        })).then(function () {
            toast.info("Course deleted")
        }).catch(function (e) {
            displayError("Could not delete course", e)
        })
    }
}

export async function registrarDeleteDeleteCourseRequest(context, item) {
    try {
        await API.graphql(graphqlOperation(deleteDeleteCourseRequest, {
            input: {
                id: item.id
            }
        }))
        toast.info("Request Deleted")
        registarShowDeleteCourseRequests(context)
        return true
    } catch (e) {
        displayError("Could not delete 'Delete course request'", e)
        return false
    }
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

