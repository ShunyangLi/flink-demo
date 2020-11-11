import React, { Component } from "react";
import "@/style/view-style/index.scss";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import D3Graph from "./Graph";
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
      code: "MATCH (a)-[b]-(c) RETURN a;",
      visible: false,
      loadingGraph: false,
      data: {
        nodes: [],
        edges: [],
        legendOptions: []
      },
      colors: []
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
      .post(`${API}`, {
        cypher: this.state.code
      })
      .then(res => {
        // query consist with labels and edges
        const query = res.data.data.query;
        // get the labels and edges data
        const { labels, edges } = query;
        let colors = this.state.colors;

        let legends = [];
        labels.forEach(label => {
          label = label.replaceAll(" ", "-");

          let color = this.generateColor();
          while (colors.indexOf(color) !== -1) {
            color = this.generateColor();
          }
          // add color to state value
          colors.push(color);
          legends.push({
            label: label,
            value: label,
            color: color
          });
        });

        let nodes = [];
        let data_edges = [];

        // collect the nodes and edges info
        edges.forEach(edge => {
          const source = edge[0];
          const target = edge[1];
          const label = edge[2].replaceAll(" ", "-");

          if (nodes.indexOf(source) === -1) nodes.push(source);
          if (nodes.indexOf(target) === -1) nodes.push(target);

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
        });

        let data_nodes = [];
        nodes.forEach(node => {
          data_nodes.push({
            comboId: undefined,
            data: {
              id: node,
              label: node,
              properties: [],
              type: labels[node].replaceAll(" ", "-")
            },
            id: node,
            label: node,
            shape: "CircleNode",
            style: {
              fontFamily: "graphin",
              icon: "",
              nodeSize: 24,
              primaryColor: colors[node]
            }
          });
        });

        console.log(data_nodes, data_edges, legends);
        this.setState({
          data: {
            nodes: data_nodes,
            edges: data_edges,
            legendOptions: legends
          },
          loadingGraph: !this.state.loadingGraph
        });
      })
      .catch(err => {
        // console.log(err.response);
        message.error("Something error");
      });
  };

  // generate a random color, used for the label
  generateColor = () => {
    return (
      "#" +
      Math.random()
        .toString(16)
        .substr(-6)
    );
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
              <D3Graph
                key={1}
                loadingGraph={this.state.loadingGraph}
                data={this.state.data}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Index);
