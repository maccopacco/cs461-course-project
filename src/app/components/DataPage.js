import {Component} from "react";
import MaterialTable from "material-table";


const StudentOptions = {
    VIEW1: 0,
    VIEW2: 1
}

export default class DataPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [{value: "hey"}],
            studentOption: StudentOptions.VIEW1,
        }
    }

    getColumnsForType() {
        switch (this.userType()) {
            case "Student":
                switch (this.state.studentOption) {
                    case StudentOptions.VIEW1:
                        return [{title: "Test", field: 'value'}]
                    default:
                        return [{title: "Summ else", field: 'value'}]
                }
            default:
                return []
        }
    }

    userType() {
        const u = this.props.user
        if (u == null)
            return null
        const t = u.user_type
        let s = t.toLocaleLowerCase()
        s = s[0].toUpperCase() + s.slice(1)
        return s
    }

    buttonsForType() {
        const here = this
        let buttons = []
        switch (this.userType()) {
            case "Student": {
                buttons = [
                    {
                        title: "First thing", onClick: function () {
                            here.setState({studentOption: StudentOptions.VIEW1})
                        }
                    },
                    {
                        title: "Second thing", onClick: function () {
                            here.setState({studentOption: StudentOptions.VIEW2})
                        }
                    }
                ]
                break;
            }
        }
        return buttons.map(this.makeButton)
    }

    makeButton(item) {
        return <button onClick={() => item.onClick()}>{item.title}</button>
    }

    render() {
        return <>
            <div className='sideBySide'>
                <div className='inALine leftItem'>
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