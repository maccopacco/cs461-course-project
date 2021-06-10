import {RegistrarOptions} from "./Options";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listCreateCourseRequests} from "../graphql/queries";
import {displayError} from "./Utilities";
import {API} from "@aws-amplify/api";
import {deleteCreateCourseRequest} from "../graphql/mutations";
import {toast} from "react-toastify"
import {loadCourseRequests} from "./CourseRequest";

export function registrarShowCreateCourseRequests(context) {
    context.setState({registrarOptions: RegistrarOptions.VIEW_CREATE_COURSE_REQUESTS, data: []})
    loadCourseRequests(context)
}

export function registrarDeleteCreateCourseRequest(context, row) {
    API.graphql(graphqlOperation(deleteCreateCourseRequest, {
        input: {
            id: row.id
        }
    })).then(function () {
        toast.info("Deleted")
        registrarShowCreateCourseRequests(context)
    }).catch(function (e) {
        displayError("Could not delete create course request", e)
    })
}