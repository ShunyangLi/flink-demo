import React, { Component } from "react";
import "@/style/view-style/index.scss";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import D3Graph from "./Graph";
import PatternGraph from "./PatternGraph";
import { Button, Form, Icon, message } from "antd";
import CodeEditer from "./CodeEditer/CodeEditer";
import icons from "../../components/SVGFile/icons";
import axios from "@/api";
import { API } from "@/api/config";
import "./index.scss";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [
        {
          id: 1,
          name: "student"
        },
        {
          id: 2,
          name: "users"
        }
      ],
      code: "MATCH (p1:Person)-[:Knows]->(p2:Person) RETURN *;",
      visible: false,
      loadingGraph: false,
      data: {
        nodes: [],
        edges: [],
        legendOptions: []
      },
      props_data: {
        query: {},
        results: {}
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
      total: 0
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
      loadingGraph: !this.state.loadingGraph
    });

    console.log(this.state.code.replaceAll("\n", " "));

    axios
      .get(`${API}/query`, {
        params: {
          queryJson: {
            query: this.state.code.replaceAll("\n", " ")
          }
        }
      })
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
      })
      .catch(err => {
        console.log(err);
        message.error("Something error");
      });
  };

  // generate a random color, used for the label
  // generateColor = () => {
  //   return "#" + Math.floor(Math.random() * 16777215).toString(16);
  // };

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
            nodes.push({
              comboId: undefined,
              data: {
                id: node_id,
                label: node_id,
                properties: [],
                type:
                  labels[
                    result.findIndex(r => {
                      return r.toString() === node_id;
                    })
                  ]
              },
              id: node_id,
              label: node_id,
              shape: "CircleNode",
              style: {
                fontFamily: "graphin",
                icon: "",
                nodeSize: 24,
                primaryColor:
                  colors[
                    labels[
                      result.findIndex(r => {
                        return r.toString() === node_id;
                      })
                    ]
                  ]
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

    console.log(data_edges);
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
  next_pattern = () => {
    // display pattern
    this.setState({
      title: "Graph pattern"
    });

    this.extract_pattern(this.state.props_data);
  };

  prev_pattern = () => {
    // display result
    this.setState({
      title: "Graph data"
    });

    this.extract_node_edges(this.state.props_data);
  };

  render() {
    return (
      <div className="content">
        <div>
          <CustomBreadcrumb arr={["database"]} />
        </div>

        {/* tag and graph part */}
        <div className="tagGraphContainer">
          {/* the graph part */}
          <div className={"graph"}>
            <div>
              <CodeEditer code={this.state.code} set_code={this.set_code} />
              <Button className={"graphButtons"} onClick={this.set_graph}>
                <Icon component={icons["run"]} />
              </Button>
              <Button className={"graphButtons"}>
                <Icon component={icons["clean"]} />
              </Button>
            </div>
            <div className="graphContainer">
              {this.state.type === "pattern" && (
                <PatternGraph
                  key={1}
                  loadingGraph={this.state.loadingGraph}
                  data={this.state.data}
                  next_pattern={this.next_pattern.bind(this)}
                  prev_pattern={this.prev_pattern.bind(this)}
                  title={this.state.title}
                  text_res={JSON.stringify(this.state.props_data)}
                  table={this.state.table}
                  cost={this.state.cost}
                  total={this.state.total}
                />
              )}

              {this.state.type === "result" && (
                <D3Graph
                  key={1}
                  loadingGraph={this.state.loadingGraph}
                  data={this.state.data}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Index);
