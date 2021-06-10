import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listCreateCourseRequests, listDepartments} from "../graphql/queries";
import {InstructorOptions} from "./Options";
import {registrarShowDepartments} from "./RegistrarDepartments";
import {displayError} from "./Utilities";
import React from "react";
import {createCreateCourseRequest} from "../graphql/mutations";
import {toast} from "react-toastify";
import {instructorViewCreateCourseRequest} from "./InstructorViewCreateCourseRequest";

export function checkIfDepartmentHead(context, ifDepartmentHead) {
    API.graphql(graphqlOperation(listDepartments))
        .then(function (data) {
            const departments = data.data.listDepartments.items
            const myDepartments = departments.filter(function (value) {
                const head = value.head
                if (head == null) return false
                return head.id === context.props.user.id
            })
            if (myDepartments.length > 0) {
                ifDepartmentHead(myDepartments)
            } else {
                displayError("You're not the head of any department, no can do")
            }
        })
        .catch(function (error) {
            displayError("Could not check if you were the department head", error)
        })
}

export function instructorCreateCourseRequest(context) {
    checkIfDepartmentHead(context, function (myDepartments) {
        context.setState({my_departments: myDepartments})
        context.setState({instructorOptions: InstructorOptions.CREATE_COURSE_STEP_1})
        registrarShowDepartments(context, false)
    });
}

export function createCoursePopup(popupRef, context) {
    const name = React.createRef()
    const section = React.createRef()
    const credits = React.createRef()
    return <div>
        <p>{`Course name: ${context.state.department_to_create_course_in.name}`}</p>
        <div>
            <label htmlFor="name">Name: </label>
            <input ref={name} id="name" type='number'/>
        </div>

        <div>
            <label htmlFor="section">Section: </label>
            <input ref={section} id="section" type='number'/>
        </div>

        <div>
            <label htmlFor="credits">Credit hrs: </label>
            <input ref={credits} id="credits" type='number'/>
        </div>

        <button onClick={async function () {
            const current = popupRef.current
            if (await createCourseRequest(context,
                parseInt(name.current.value),
                parseInt(section.current.value),
                parseInt(credits.current.value))) {
                current.close()
                instructorViewCreateCourseRequest(context)
            }
        }}>
            Submit
        </button>
    </div>
}

export async function createCourseRequest(context, name, section, credit_hours) {
    if (section === '') {
        displayError("Must choose a section to continue")
        return false
    }
    try {
        let departmentId = context.state.department_to_create_course_in.id;

        const data = await API.graphql(graphqlOperation(listCreateCourseRequests, {
            filter: {
                course_section: {
                    eq: section
                },
                course_name: {
                    eq: name
                }
            }
        }))
        const courseRequests = data.data.listCreateCourseRequests.items
        if (courseRequests.some(function (value) {
            return value.course_department.id === departmentId
        })) {
            displayError("Already exists")
            return false
        }

        await API.graphql(graphqlOperation(createCreateCourseRequest, {
            input: {
                createCourseRequestCourse_departmentId: departmentId,
                course_name: name,
                course_section: section,
                credit_hours: credit_hours,
                createCourseRequestHead_instructorId: context.props.user.id
            }
        }))
        toast.info("Course request saved")
        return true
    } catch (e) {
        displayError("Could not save course request", e)
        return false
    }
}