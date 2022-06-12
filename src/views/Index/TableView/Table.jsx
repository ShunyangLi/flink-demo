import React, { Component } from "react";
import { Table, Button, Modal, Col, Row, message } from "antd";
// import reducer from "../../../store/reducer";
import D3Graph from "../Graph";
import axios from "@/api";
import { API } from "@/api/config";

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
      visible: false,
      data: {
        nodes: [],
        edges: [],
        legendOptions: []
      },
      colors: []
    };
  }

  show_graph_with_id = record => {
    let { account } = record;
    message.success("正在查询子图");
    axios
      .get(`${API}/query/${this.props.pattern}/${account}`, {})
      .then(res => {
        message.success("数据查询成功");
        this.setState({
          colors: []
        });
        this.extract_data(res.data);
        this.setState({
          visible: true
        });
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  show_all = () => {
    axios
      .get(`${API}/patter/${this.props.pattern}`, {})
      .then(res => {
        this.setState({
          colors: []
        });
        this.extract_data(res.data);
        message.success("数据查询成功");
        this.setState({
          visible: true
        });
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  // to extract the nodes and edges from data
  extract_data = data => {
    if (data === undefined) return;
    const labels = data.query.labels;
    let colors = this.state.colors;
    let legends = [];

    labels.forEach(label => {
      // set colors
      let color = this.generateColor();
      if (colors[label] === undefined) colors[label] = color;
      if (
        legends.filter(l => {
          return l.label === label.toString();
        }).length === 0
      ) {
        legends.push({
          label: label.toString(),
          value: label.toString(),
          color: color
        });
      }
    });

    // set legends color
    this.setState({
      data: {
        legendOptions: legends
      }
    });

    // extract nodes
    this.extract_node_edges(data);
  };

  // generate a random color, used for the label
  generateColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // extract the result by using next_index
  extract_node_edges = data => {
    // console.log("index", next_index);
    const query = data.query;
    // get the labels and edges data
    const { labels, edges } = query;
    let colors = this.state.colors;
    // const result = data.results[next_index];
    let nodes = [];
    let data_edges = [];
    let results = data.results;

    results.forEach(result => {
      edges.forEach(edge => {
        const source = result[edge.src].toString();
        const target = result[edge.dest].toString();
        const label = edge.label.toString();

        // add the nodes
        let temp_nodes = [source, target];
        temp_nodes.forEach(node_id => {
          if (nodes.filter(node => node.id === node_id).length === 0) {
            let tl =
              labels[
                result.findIndex(r => {
                  return r.toString() === node_id;
                })
              ];
            let ic = "";
            if (["用户"].indexOf(tl.toString()) >= 0) {
              ic = "switch user";
            } else if (["商铺"].indexOf(tl.toString()) >= 0) {
              ic = "shop";
            } else if (["银行"].indexOf(tl.toString()) >= 0) {
              ic = "bank-fill";
            }

            nodes.push({
              comboId: undefined,
              data: {
                id: node_id,
                label: node_id,
                properties: [],
                type: tl
              },
              id: node_id,
              label: node_id,
              shape: "CircleNode",
              style: {
                fontFamily: "graphin",
                icon: ic,
                nodeSize: 24,
                primaryColor: colors[tl]
              }
            });
          }
        });

        const temp = data_edges.filter(e => {
          return (
            e.label === label && e.source === source && e.target === target
          );
        });
        if (temp.length === 0) {
          data_edges.push({
            data: {
              label: label,
              properties: [],
              source: source,
              target: target
            },
            label: label,
            source: source,
            target: target
          });
        }
      });
    });
    // console.log(nodes, data_edges);
    this.setState({
      data: {
        nodes: nodes,
        edges: data_edges,
        legendOptions: this.state.data.legendOptions
      }
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
          height={700}
          onCancel={this.handleOk}
          okText="确认"
          cancelText="取消"
        >
          <D3Graph key={1} data={this.state.data} />
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
          dataSource={this.props.tdata}
          // pagination={false}
          style={{ marginRight: "10px" }}
        />
      </div>
    );
  }
}

export default TableView;
