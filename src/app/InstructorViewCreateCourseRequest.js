import {checkIfDepartmentHead} from "./InstructorCreateCourseRequest";
import {loadCourseCreateRequests} from "./CourseRequests";
import {InstructorOptions} from "./Options";

export function instructorViewCreateCourseRequest(context) {
    checkIfDepartmentHead(context, function (departments) {
        const ids = departments.map(v => v.id)
        context.setState({instructorOptions: InstructorOptions.VIEW_CREATE_COURSE_REQUESTS, data: []})

        loadCourseCreateRequests(context, function (value) {
            return ids.includes(value.course_department.id)
        })
    })
}