import {checkIfDepartmentHead} from "./InstructorCreateCourseRequest";
import {loadCourseRequests} from "./CourseRequest";
import {InstructorOptions} from "./Options";

export function instructorViewCreateCourseRequest(context) {
    checkIfDepartmentHead(context, function (departments) {
        const ids = departments.map(v => v.id)
        console.log('my ids', ids)
        context.setState({instructorOptions: InstructorOptions.VIEW_CREATE_COURSE_REQUESTS, data: []})
        loadCourseRequests(context, function (value) {
            // return value.id in ids
            return true
        })
    })
}