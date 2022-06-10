import React, { Component } from "react";
import { Button, Divider, Table, message } from "antd";

const data = [
  {
    name: "PaySim",
    direction: "有向图",
    label: "整数"
  }
];

export default class DBname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "图类型",
          dataIndex: "direction",
          key: "direction",
          align: "center"
        },
        {
          title: "标签",
          dataIndex: "label",
          key: "label",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: () => (
            <span>
              {/* need to pass a value */}
              <Button
                type="primary"
                icon="plus"
                onClick={this.load_graph.bind(this)}
              >
                加载
              </Button>
              <Divider type="vertical" />
              {/* need to pass a function */}
              <Button type="danger" icon="delete">
                删除
              </Button>
            </span>
          )
        }
      ]
    };
  }

  load_graph = () => {
    message.success("加载成功");
  };

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
