import {Component} from "react";
import MaterialTable from "material-table";

export default class DataPage extends Component {

    userType() {
        return this.props.user == null ? "Unknown" : this.props.user.user_type
    }
    render() {
        const data = []
        if (this.props.user != null){
            data.push(this.props.user)
        }
        return <>
            <p>{this.userType()}</p>
            <MaterialTable
                columns={[
                    { title: "First name", field: "first_name" },
                    { title: "Last name", field: "last_name" },
                ]}
                data={data}
                title="Demo Title"
            />
        </>
    }
}