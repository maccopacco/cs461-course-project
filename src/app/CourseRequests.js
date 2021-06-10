import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listCreateCourseRequests, listDeleteCourseRequests} from "../graphql/queries";
import {displayError, userFullName} from "./Utilities";

export function loadCourseCreateRequests(context, filter = function () {
    return true
}) {
    API.graphql(graphqlOperation(listCreateCourseRequests))
        .then(function (data) {
            let requests = data.data.listCreateCourseRequests.items
            requests = requests.filter(filter)
            requests = requests.map(function (value) {
                value.department = value.course_department.name
                if ('head_instructor' in value) {
                    let h = value.head_instructor;
                    value.instructor_name = `${h.first_name} ${h.last_name}`
                }
                return value
            })
            context.setState({data: requests})
        }).catch(function (e) {
        displayError("Could not view create course requests", e)
    })
}

export function loadCourseDeleteRequests(context, filter = function () {
    return true
}) {
    API.graphql(graphqlOperation(listDeleteCourseRequests))
        .then(function (data) {
            let requests = data.data.listDeleteCourseRequests.items
            requests = requests.filter(filter)
            requests = requests.map(function (value) {
                value.department = value.course.department.name
                value.course_name = value.course.name
                value.course_section = value.course.section
                value.instructor_name = userFullName(value.head_instructor)
                value.credit_hours = value.course.credit_hours
                return value
            })
            context.setState({data: requests})
        }).catch(e => displayError("Could not view delete course requests", e))
}