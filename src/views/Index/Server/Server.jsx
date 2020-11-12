import React, { Component } from "react";
import { Table } from "antd";

let data = [
  {
    server: "unsw",
    cost: "20s",
    result: "100"
  }
];

class Server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Server",
          dataIndex: "server",
          key: "server",
          align: "center"
        },
        {
          title: "Cost",
          dataIndex: "cost",
          key: "cost",
          align: "center"
        },
        {
          title: "Result",
          dataIndex: "result",
          key: "result",
          align: "center"
        }
      ]
    };
  }

  render() {
    data[0].cost = this.props.cost;
    data[0].result = this.props.total;
    return (
      <div>
        <Table
          bordered
          components={this.components}
          columns={this.state.columns}
          dataSource={data}
          pagination={false}
          style={{ marginRight: "10px" }}
        />
      </div>
    );
  }
}

export default Server;
