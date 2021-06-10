import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listCourses} from "../graphql/queries";
import {displayError, userFullName} from "./Utilities";

export function loadCourses(context) {
    API.graphql(graphqlOperation(listCourses))
        .then(function (data) {
            let courses = data.data.listCourses.items
            courses = courses.map(function (value) {
                value.combined_name = `${value.department.name} ${value.name}`
                value.instructor_name = userFullName(value.instructor)
                return value
            })
            context.setState({data: courses, studentOption: 0,instructorOptions: 0, registrarOptions: 0})
        }).catch(function (e) {
        displayError("Could not load courses", e)
    })

}