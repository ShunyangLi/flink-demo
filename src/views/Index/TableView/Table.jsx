import React, { Component } from "react";
import { Table, Button, Modal, Col, Row } from "antd";
// import reducer from "../../../store/reducer";
import D3Graph from "../Graph";

let data = [
  {
    rank: "1",
    account: "C3156307206",
    percent: "3"
  },
  {
    rank: "2",
    account: "C4712130154",
    percent: "2"
  },
  {
    rank: "3",
    account: "C2251403439",
    percent: "1"
  },
  {
    rank: "4",
    account: "C6199774840",
    percent: "1"
  },
  {
    rank: "5",
    account: "C5296316207",
    percent: "1"
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
      ],
      visible: false
    };
  }

  show_graph_with_id = record => {
    let { account } = record;

    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  show_all = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    // data[0].cost = this.props.cost;
    // data[0].result = this.props.total;
    return (
      <div>
        <Modal
          title="嫌疑账户显示"
          visible={this.state.visible}
          onOk={this.handleOk}
          width={700}
          onCancel={this.handleOk}
          okText="确认"
          cancelText="取消"
        >
          <D3Graph key={1} data={this.props.data} />
        </Modal>
        <Row style={{ margin: "2%" }}>
          <Col span={12}>
            <h3>检测结果：</h3>
          </Col>
          {/*<Col span={12} />*/}
          <Col span={6} offset={6}>
            <Button onClick={this.show_all}>显示全部</Button>
          </Col>
        </Row>
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
