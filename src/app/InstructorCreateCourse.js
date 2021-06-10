import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listCreateCourseRequests, listDepartments} from "../graphql/queries";
import {InstructorOptions} from "./Options";
import {registrarShowDepartments} from "./RegistrarDepartments";
import {displayError} from "./Utilities";
import React from "react";
import {createCreateCourseRequest} from "../graphql/mutations";
import {toast} from "react-toastify";

export function instructorCreateCourse(context) {
    API.graphql(graphqlOperation(listDepartments))
        .then(function (data) {
            const departments = data.data.listDepartments.items
            const myDepartments = departments.filter(function (value) {
                const head = value.head
                if (head == null) return false
                return head.id === context.props.user.id
            })
            if (myDepartments.length > 0) {
                context.setState({my_departments: myDepartments})
                context.setState({instructorOptions: InstructorOptions.CREATE_COURSE_STEP_1})
                registrarShowDepartments(context, false)
            } else {
                displayError("You're not the head of any department, no can do")
            }
        })
        .catch(function (error) {
            displayError("Could not check if you were the department head", error)
        })
}

export function createCoursePopup(popupRef, context) {
    const section = React.createRef()
    return <div>
        <p>{`Course name: ${context.state.department_to_create_course_in.name}`}</p>

        <label htmlFor="section">Section: </label>
        <input ref={section} id="section" type='number'/>
        <button onClick={async function () {
            const current = popupRef.current
            if (await createCourseRequest(context, parseInt(section.current.value))) {
                current.close()
                context.setState({instructorOptions: InstructorOptions.DEFAULT_OPTION, data: []})
            }
        }}>
            Submit
        </button>
    </div>
}

export async function createCourseRequest(context, section) {
    if (section === '') {
        displayError("Must choose a section to continue")
        return false
    }
    try {
        let courseName = context.state.department_to_create_course_in.name;

        const alreadyExisting = await API.graphql(graphqlOperation(listCreateCourseRequests, {
            filter: {
                course_name: {
                    eq: courseName
                },
                course_section: {
                    eq: section
                }
            }
        }))
        if (alreadyExisting.data.listCreateCourseRequests.items.length > 0) {
            displayError("Already exists")
            return false
        }

        await API.graphql(graphqlOperation(createCreateCourseRequest, {
            input: {
                course_name: courseName,
                course_section: section,
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