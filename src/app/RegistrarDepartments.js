import {RegistrarOptions} from "./Options";
import {API} from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listDepartments} from "../graphql/queries";
import {displayError, userType} from "./Utilities";
import {toast} from "react-toastify";
import React from "react";
import {
    updateDepartment,
    deleteDepartment as deleteDepartmentMutation,
    createDepartment as createDepartmentMutation
} from "../graphql/mutations";

export function registrarShowDepartments(context, setOption = true) {
    if (setOption)
        context.setState({registrarOptions: RegistrarOptions.VIEW_DEPARTMENTS})
    context.setState({data: []})

    API.graphql(graphqlOperation(listDepartments))
        .then(function (data) {
            let departments = data.data.listDepartments.items
            departments = departments.map(function (value) {
                let head = value.head;
                if (head != null) {
                    value.head_name = `${head.first_name} ${head.last_name}`
                }
                return value
            })
            console.log('departments', departments)
            context.setState({data: departments})
        })
        .catch(function (error) {
            displayError("Cannot load departments", error)
        })
}

export async function createDepartment(context, name) {
    try {
        if (name === '') {
            displayError("Department name cannot be empty!")
            return false
        }
        const response = await API.graphql(graphqlOperation(listDepartments, {
            filter: {
                name: {
                    eq: name
                }
            }
        }))
        console.log('response', response)

        if (response.data.listDepartments.items.length > 0) {
            displayError("Department already exists with that name")
            return false
        }
        await API.graphql(graphqlOperation(createDepartmentMutation, {
            input: {
                name: name
            }
        }))
        toast.info(`${name} department created`)
        registrarShowDepartments(context)
        return true
    } catch (error) {
        displayError("Could not create department", error)
        return false
    }
}

export function createDepartmentPopup(context, popupRef) {
    const name = React.createRef()
    return <div>
        <label htmlFor="name">Department name: </label>
        <input ref={name} id="name"/>
        <button onClick={async function () {
            const current = popupRef.current
            if (await createDepartment(context, name.current.value) === true) {
                current.close()
            }
        }}
        >Submit
        </button>
    </div>
}

export function deleteDepartment(rowData, context) {
    API.graphql(graphqlOperation(deleteDepartmentMutation, {
        input: {
            id: rowData.id
        }
    })).then(function () {
        toast.info("Department deleted")
        registrarShowDepartments(context)
    }).catch(function (error) {
        displayError("Could not delete department", error)
    })
}

export function registrarAssignDepartmentHead(context) {
    context.setState({registrarOptions: RegistrarOptions.ASSIGN_HEAD_STEP_1})
    registrarShowDepartments(context, false)
}

export function assignDepartmentHead(context, department, user) {
    const userPresent = user != null
    if (!userPresent || user.user_type === 'INSTRUCTOR') {
        API.graphql(graphqlOperation(updateDepartment, {
            input: {
                id: department.id,
                departmentHeadId: userPresent ? user.id : null
            }
        })).then(function () {
            toast.info("Updated")
            registrarAssignDepartmentHead(context)
        }).catch(function (error) {
            displayError("Cannot update head instructor", error)
        })
    } else {
        displayError(`You can't make a ${userType(user)} a head instructor!`)
    }
}