import {RegistrarOptions} from "./Options";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listCreateCourseRequests} from "../graphql/queries";
import {displayError} from "./Utilities";
import {API} from "@aws-amplify/api";
import {createCourse, deleteCreateCourseRequest} from "../graphql/mutations";
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

export function registrarApproveCreateCourseRequest(context, row) {
    API.graphql(graphqlOperation(createCourse, {
        input: {
            name: row.course_name,
            section: row.course_section,
            courseDepartmentId: row.course_department.id,
            credit_hours: row.credit_hours,
            courseInstructorId: context.props.user.id
        }
    })).then(function () {
        toast.info("Course created")
        registrarDeleteCreateCourseRequest(context, row)
    }).catch(function (e) {
        displayError("Could not approve request",e)
    })
}
