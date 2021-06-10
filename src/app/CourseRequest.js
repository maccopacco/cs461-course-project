import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listCreateCourseRequests} from "../graphql/queries";
import {displayError} from "./Utilities";

export function loadCourseRequests(context, filter = function () {
    return true
}) {
    API.graphql(graphqlOperation(listCreateCourseRequests))
        .then(function (data) {
            let requests = data.data.listCreateCourseRequests.items
            console.log('requests', requests)
            requests = requests.filter(filter)
            requests = requests.map(function (value) {
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