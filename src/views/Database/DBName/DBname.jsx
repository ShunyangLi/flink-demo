import React, { Component } from "react";
import { Button, Divider, Table } from "antd";

const data = [
  {
    name: "test",
    direction: "directed",
    label: "integer"
  }
];

export default class DBname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "Direction",
          dataIndex: "direction",
          key: "direction",
          align: "center"
        },
        {
          title: "Label",
          dataIndex: "label",
          key: "label",
          align: "center"
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          render: () => (
            <span>
              {/* need to pass a value */}
              <Button type="primary" icon="plus">
                Load
              </Button>
              <Divider type="vertical" />
              {/* need to pass a function */}
              <Button type="danger" icon="delete">
                Delete
              </Button>
            </span>
          )
        }
      ]
    };
  }

  render() {
    return (
      <div>
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
