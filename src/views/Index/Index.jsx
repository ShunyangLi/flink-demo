import React, { Component } from "react";
import "@/style/view-style/index.scss";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import TableView from "./TableView";
import { Button, Form, message, Radio } from "antd";
import ls from "../../assets/images/4.svg";
import axios from "@/api";
import { API } from "@/api/config";
import "./index.scss";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loadingGraph: false,
      data: {
        nodes: [],
        edges: [],
        legendOptions: []
      },
      colors: [],
      type: "pattern",
      title: "Graph data",
      // add a table information
      table: {
        columns: [],
        dataSource: []
      },
      cost: "",
      total: 0,
      pattern: 1,
      loading: false
    };
  }

  // set code when the code chanage
  set_code = code => {
    this.setState({
      code: code
    });
  };

  set_graph = () => {
    // when runing the result we set loading
    this.setState({
      loading: true
    });

    message.success("正在查询");

    setTimeout(() => {
      axios
        .get(`${API}/query`, {})
        .then(res => {
          console.log(res.data);
          this.setState({
            props_data: res.data,
            total: res.data.results.length,
            loadingGraph: !this.state.loadingGraph,
            cost: res.data.runTime + "ms"
          });

          this.extract_data(res.data);
          this.extract_table(res.data);

          message.success("数据查询成功");
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          console.log(err);
          message.error("网络错误");
        });
    }, 1000);
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
            if (["用户", "client"].indexOf(tl.toString()) >= 0) {
              ic = "switch user";
            } else if (["商铺", "Merchant"].indexOf(tl.toString()) >= 0) {
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

  extract_pattern = data => {
    // console.log("index", next_index);
    const query = data.query;
    // get the labels and edges data
    const { labels, edges } = query;
    let colors = this.state.colors;
    // const result = data.results[next_index];
    let nodes = [];
    let data_edges = [];

    console.log(labels);

    edges.forEach(edge => {
      let source = labels[edge.src].toString();
      let target = labels[edge.dest].toString();
      const label = edge.label.toString();

      if (
        nodes.filter(node => {
          return node.id === edge.src.toString();
        }).length === 0
      ) {
        nodes.push({
          comboId: undefined,
          data: {
            id: edge.src.toString(),
            label: source,
            properties: [],
            type: source
          },
          id: edge.src.toString(),
          label: source,
          shape: "CircleNode",
          style: {
            fontFamily: "graphin",
            icon: "",
            nodeSize: 24,
            primaryColor: colors[source]
          }
        });
      }

      if (
        nodes.filter(node => {
          return node.id === edge.dest.toString();
        }).length === 0
      ) {
        nodes.push({
          comboId: undefined,
          data: {
            id: edge.dest.toString(),
            label: target,
            properties: [],
            type: target
          },
          id: edge.dest.toString(),
          label: target,
          shape: "CircleNode",
          style: {
            fontFamily: "graphin",
            icon: "",
            nodeSize: 24,
            primaryColor: colors[target]
          }
        });
      }

      console.log(source);

      data_edges.push({
        data: {
          label: label,
          properties: [],
          source: edge.src.toString(),
          target: edge.dest.toString()
        },
        label: label,
        source: edge.src.toString(),
        target: edge.dest.toString()
      });
    });

    // console.log(data_edges);
    // console.log(nodes, data_edges);
    this.setState({
      data: {
        nodes: nodes,
        edges: data_edges,
        legendOptions: this.state.data.legendOptions
      }
    });
  };

  extract_table = data => {
    const query = data.query;
    // get the labels and edges data
    const { labels } = query;
    const results = data.results;

    let cols = [];
    let col_data = [];

    labels.forEach(label => {
      if (
        cols.filter(c => {
          return c.key === label;
        }).length === 0
      ) {
        cols.push({
          title: label,
          dataIndex: label,
          key: label,
          align: "center"
        });
      }
    });

    results.forEach(res => {
      let tmp = {};
      res.forEach(function(item, index) {
        tmp[labels[index]] = item;
      });
      col_data.push(tmp);
    });

    this.setState({
      table: {
        columns: cols,
        dataSource: col_data
      }
    });
  };

  change_pattern = e => {
    this.setState({
      pattern: e.target.value
    });
  };

  show_all = () => {};

  render() {
    return (
      <div className="content">
        <div>
          <CustomBreadcrumb arr={["数据库"]} />
        </div>

        {/* tag and graph part */}
        <div className="tagGraphContainer">
          {/* the graph part */}
          <div className={"graph"}>
            <div>
              {/* <CodeEditer code={this.state.code} set_code={this.set_code} /> */}
              <div className="rs">
                <Radio.Group
                  value={this.state.pattern}
                  onChange={this.change_pattern}
                  style={{ marginLeft: "3%" }}
                >
                  <Radio value={1} className={"pps"}>
                    <label className="drinkcard-cc p1" htmlFor="p1" />
                  </Radio>

                  <Radio value={2} className={"pps"}>
                    <label className="drinkcard-cc p2" htmlFor="p1" />
                  </Radio>

                  <Radio value={3} className={"pps"}>
                    <label className="drinkcard-cc p3" htmlFor="p1" />
                  </Radio>
                </Radio.Group>

                <img
                  src={ls}
                  alt={"label"}
                  style={{ height: "80px", marginTop: "2%", marginLeft: "25%" }}
                />
              </div>
              <div className={"tts"}>
                <Button
                  type="primary"
                  block
                  onClick={this.set_graph}
                  loading={this.state.loading}
                >
                  检测
                </Button>
              </div>
            </div>

            <div className="graphContainer">
              {/*<h3 style={{margin: '2%'}}></h3>*/}
              <TableView data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Index);
