import {Component} from "react";
import MaterialTable from "material-table";

export default class DataPage extends Component {
    render() {
        const data = []
        if (this.props.user != null){
            data.push(this.props.user)
        }
        return <>
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