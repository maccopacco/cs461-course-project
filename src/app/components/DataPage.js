import {Component} from "react";
import MaterialTable from "material-table";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {createDepartment, createDepartmentHead, deleteDepartment, deleteDepartmentHead} from "../../graphql/mutations";
import {API} from "@aws-amplify/api";
import {listDepartmentHeads, listDepartments} from "../../graphql/queries";


//Enums for different views (like showing classes, previous course reports, blah blah blah)
const StudentOptions = {
    SHOW_CLASSES: 0,
    SHOW_COURSE_REPORTS: 1,
}
const InstructorOptions = {
    DEFAULT_OPTION: 0
}
const RegistrarOptions = {
    DEFAULT_OPTION: 0
}

export default class DataPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            studentOption: StudentOptions.SHOW_CLASSES,
            instructorOption: InstructorOptions.DEFAULT_OPTION,
            RegistrarOptions: RegistrarOptions.DEFAULT_OPTION
        }
    }

    /**
     * Coverts usertype, and current option to list of column values
     * @returns {{field: string, title: string}[]|*[]}
     */
    getColumnsForType() {
        switch (this.userType()) {
            case "Student":
                switch (this.state.studentOption) {
                    case StudentOptions.SHOW_CLASSES:
                        return [{title: "Class Name", field: 'className'}]
                }
        }
        return []
    }

    /**
     * Get user_type from user property as string
     * @returns {string|null}
     */
    userType() {
        const u = this.props.user
        if (u == null)
            return null
        const t = u.user_type
        let s = t.toLocaleLowerCase()
        s = s[0].toUpperCase() + s.slice(1)
        return s
    }

    /**
     * Gets buttons that are shown for each user type
     */
    buttonsForType() {
        const here = this
        let buttons = []
        switch (this.userType()) {
            case "Student": {
                buttons = [
                    {
                        title: "Show classes", onClick: function () {
                            here.setState({studentOption: StudentOptions.SHOW_CLASSES})
                        }
                    },
                    {
                        title: "Show course reports", onClick: function () {
                            here.setState({studentOption: StudentOptions.SHOW_COURSE_REPORTS})
                        }
                    }, {
                        title: "Create Department", onClick: function () {
                            here.createDepartment()
                        }
                    }, {
                        title: "Show departments", onClick: function () {
                            here.showDepartments()
                        }
                    }, {
                        title: "Delete departments", onClick: function () {
                            here.deleteDepartments()
                        },
                    }, {
                        title: "Delete heads", onClick: function() {
                            here.deleteHeads()
                        }
                    }
                ]
                break;
            }
        }
        return buttons.map(this.makeButton)
    }

    async deleteDepartments() {
        const departments = await this.showDepartments()
        console.log('gonna delete, got these', departments)
        for (let d of departments) {
            API.graphql(graphqlOperation(deleteDepartment, {
                input: {
                    id: d.id
                }
            })).then(() => console.log('bye'))
                .catch((error) => console.error('not bye', error))
        }
    }

    async showDepartments() {
        const data = await API.graphql(graphqlOperation(listDepartments))
            .catch((error) => console.error('no departments', error))
        let departments = data.data.listDepartments.items;
        console.log('Departments', departments)
        return departments
    }

    async showDepartmentHeads() {
        const data = await API.graphql(graphqlOperation(listDepartmentHeads))
        console.log('data', data)
        const heads = data.data.listDepartmentHeads.items
        console.log('heads', heads)
        return heads
    }

    async deleteHeads() {
        const heads = await this.showDepartmentHeads()
        for (let h of heads) {
            await API.graphql(graphqlOperation(deleteDepartmentHead, {
                input: {
                    id: h.id
                }
            }))
        }
        await this.showDepartmentHeads()
    }

    createDepartment() {
        const here = this
        API.graphql(graphqlOperation(createDepartment, {
            input: {
                name: "Math",
            }
        })).then(async function (data) {
            // await here.deleteHeads()

            const department = data.data.createDepartment
            console.log('created department', department)
            API.graphql(graphqlOperation(createDepartmentHead, {
                input: {
                    // department: department.id,
                    // head: here.props.user.id
                    departmentHeadDepartmentId: department.id,
                    departmentHeadHeadId: here.props.user.id
                }
            })).then(function () {

            })
        })
            .catch((error) => console.error('could not create department', error))
    }

    makeButton(item, index) {
        return <button key={index} onClick={() => item.onClick()}>{item.title}</button>
    }

    render() {
        return <>
            <div className='sideBySide'>
                <div className='verticalGroup'>
                    <p>Options {this.userType() != null ? ("for " + this.userType()) : ""}</p>
                    {this.buttonsForType()}
                </div>
                <div className='datapage'>
                    <MaterialTable
                        columns={this.getColumnsForType()}
                        data={this.state.data}
                        title="Results"
                    />
                </div>
            </div>
        </>
    }
}