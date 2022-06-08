import React, { Component } from "react";
import { Table, Button } from "antd";
import reducer from "../../../store/reducer";

let data = [
  {
    rank: "1",
    account: "1234",
    percent: "89%"
  }
];

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "排名",
          dataIndex: "rank",
          key: "rank",
          align: "center"
        },
        {
          title: "嫌疑账户",
          dataIndex: "account",
          key: "account",
          align: "center",
          render: (text, record) => (
            <a onClick={this.show_graph_with_id.bind(this, record)}>{text}</a>
          )
        },
        {
          title: "嫌疑程度",
          dataIndex: "percent",
          key: "percent",
          align: "center"
        }
      ]
    };
  }

  show_graph_with_id = record => {
    let { account } = record;
  };

  render() {
    // data[0].cost = this.props.cost;
    // data[0].result = this.props.total;
    return (
      <div>
        <Table
          bordered
          components={this.components}
          columns={this.state.columns}
          dataSource={data}
          // pagination={false}
          style={{ marginRight: "10px" }}
        />
      </div>
    );
  }
}

export default TableView;
