import React, { Component } from "react";
import { Table } from "antd";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import data from "./data";

class ServerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
          align: "center"
        },
        {
          title: "total_time_millis",
          dataIndex: "total_time_millis",
          key: "total_time_millis",
          align: "center"
        },
        {
          title: "total_comm",
          dataIndex: "total_comm",
          key: "total_comm",
          align: "center"
        },
        {
          title: "num_results",
          dataIndex: "num_results",
          key: "num_results",
          align: "center"
        },
        {
          title: "max_comm",
          dataIndex: "max_comm",
          key: "max_comm",
          align: "center"
        },
        {
          title: "total_comm",
          dataIndex: "total_comm",
          key: "total_comm",
          align: "center"
        },
        {
          title: "decode_time",
          dataIndex: "decode_time",
          key: "decode_time",
          align: "center"
        },
        {
          title: "comp_time_millis",
          dataIndex: "comp_time_millis",
          key: "comp_time_millis",
          align: "center"
        },
        {
          title: "worker",
          dataIndex: "worker",
          key: "worker",
          align: "center"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <CustomBreadcrumb arr={["server information"]} />
        <Table
          bordered
          components={this.components}
          columns={this.state.columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default ServerInfo;
