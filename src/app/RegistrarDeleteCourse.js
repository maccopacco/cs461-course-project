import {RegistrarOptions} from "./Options";
import {loadCourseDeleteRequests} from "./CourseRequestsLoading";
import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {deleteCourse, deleteDeleteCourseRequest} from "../graphql/mutations";
import {toast} from "react-toastify";
import {displayError} from "./Utilities";

export function registrarShowDeleteCourseRequests(context) {
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
        registrarShowDeleteCourseRequests(context)
        return true
    } catch (e) {
        displayError("Could not delete 'Delete course request'", e)
        return false
    }
}