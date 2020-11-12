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
      code: "MATCH (p1:Person)-[:Knows]->(p2:Person) RETURN count(*);",
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
      curr: -1,
      end: 0
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

    axios
      .get(`${API}/query`, {
        params: {
          queryJson: {
            query: this.state.code
          }
        }
      })
      .then(res => {
        console.log(res);

        this.setState({
          props_data: res.data,
          end: res.data.results.length,
          loadingGraph: !this.state.loadingGraph
        });

        this.extract_data(res.data);
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

    data.results.forEach(result => {
      edges.forEach(edge => {
        console.log(edge);
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
    console.log("here");
    // // result is like [0, 1, 2]
    // result.forEach(index  => {
    //   // get edge
    //   let edge = edges[index];
    //   // get info
    //   const source = edge[0].toString();
    //   const target = edge[1].toString();
    //   const label = edge[2].toString();
    //
    //   let temp_nodes = [source, target];
    //   temp_nodes.forEach(index => {
    //     if (nodes.filter(node => node.label === labels[index]).length === 0) {
    //       nodes.push({
    //         comboId: undefined,
    //         data: {
    //           id: labels[index].toString().replaceAll(" ", "-"),
    //           label: labels[index],
    //           properties: [],
    //           type: labels[index]
    //         },
    //         id: labels[index].toString(),
    //         label: labels[index],
    //         shape: "CircleNode",
    //         style: {
    //           fontFamily: "graphin",
    //           icon: "",
    //           nodeSize: 24,
    //           primaryColor: colors[labels[index]]
    //         }
    //       });
    //     }
    //   });
    //
    //   data_edges.push({
    //     data: {
    //       label: label,
    //       properties: [],
    //       source: labels[source],
    //       target: labels[target]
    //     },
    //     label: label,
    //     source: labels[source],
    //     target: labels[target]
    //   });
    // });

    // console.log(nodes, data_edges);
    this.setState({
      data: {
        nodes: nodes,
        edges: data_edges,
        legendOptions: this.state.data.legendOptions
      }
    });
  };

  next_pattern = () => {
    console.log(this.state.curr <= this.state.end - 1);
    let curr = this.state.curr + 1;
    if (curr >= this.state.end) curr = this.state.end - 1;
    this.setState({
      curr: curr
    });
    this.extract_node_edges(this.state.props_data, curr);
  };

  prev_pattern = () => {
    let curr = this.state.curr - 1;
    if (curr <= 0) curr = 0;
    this.setState({
      curr: curr
    });
    this.extract_node_edges(this.state.props_data, curr);
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
                  curr={this.state.cur}
                  end={this.state.end}
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
