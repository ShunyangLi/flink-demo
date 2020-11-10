import React, { Component } from "react";
import { Graph } from "react-d3-graph";
import Fullscreen from "react-full-screen";
import { Tabs, PageHeader, Divider, Button, Table, Spin } from "antd";
import code from "@/assets/images/code.png";
import text from "@/assets/images/text.png";
import graph from "@/assets/images/graph.png";
import qp from "@/assets/images/quanping.png";
import refresh from "@/assets/images/refresh.png";
import download from "@/assets/images/Clouddownloadstorage.png";
import close from "@/assets/images/guanbi.png";
import server from "@/assets/images/fuwuqi.png";
import Server from "../Server";
import db_data from "./data";
import "./graph.scss";

const { TabPane } = Tabs;

// the d3 config
const myConfig = {
  automaticRearrangeAfterDropNode: true,
  collapsible: true,
  directed: false,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  height: 700,
  highlightDegree: 1,
  highlightOpacity: 1,
  linkHighlightBehavior: true,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: false,
  panAndZoom: false,
  staticGraph: false,
  staticGraphWithDragAndDrop: false,
  width: 1100,
  d3: {
    alphaTarget: 0.05,
    gravity: -200,
    linkLength: 100,
    linkStrength: 1
  },
  node: {
    color: "green",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "SAME",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    highlightStrokeColor: "SAME",
    highlightStrokeWidth: "SAME",
    labelProperty: "id",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    size: 200,
    strokeColor: "none",
    strokeWidth: 1.5,
    svg: "",
    symbolType: "circle"
  },
  link: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "#d3d3d3",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    labelProperty: "label",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    semanticStrokeWidth: false,
    strokeWidth: 1.5,
    markerHeight: 6,
    markerWidth: 6
  }
};

class D3Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        isFull: false,
        nodes: [{ id: "A" }],
        links: [{ source: "A", target: "A", label: 5 }]
      },
      columns: [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
          align: "center"
        },
        {
          title: "content",
          dataIndex: "content",
          key: "content",
          align: "center"
        }
      ]
    };
  }

  // full screen
  goFull = () => {
    this.setState({ isFull: true });
  };

  render() {
    let { data } = this.props;
    if (data.nodes.length === 0) {
      data = this.state.data;
    }
    return (
      <div>
        <PageHeader
          ghost={false}
          title="Graph Data"
          key={1}
          extra={[
            <Button className={"buttons"} key={1}>
              <img
                alt={"attribute"}
                src={qp}
                style={{ height: "20px", width: "20px" }}
                onClick={this.goFull}
              />
              <Divider type={"vertical"} />
            </Button>,
            <Button className={"buttons"} key={2}>
              <img
                alt={"attribute"}
                src={download}
                style={{ height: "20px", width: "20px" }}
              />
              <Divider type={"vertical"} />
            </Button>,
            <Button className={"buttons"} key={3}>
              <img
                alt={"attribute"}
                src={refresh}
                style={{ height: "20px", width: "20px" }}
              />
              <Divider type={"vertical"} />
            </Button>,
            <Button className={"buttons"} key={4}>
              <img
                alt={"attribute"}
                src={close}
                style={{ height: "20px", width: "20px" }}
              />
            </Button>
          ]}
        />

        <div>
          {/* header part */}
          <Tabs tabPosition={"left"} defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <img
                    alt={"attribute"}
                    src={graph}
                    style={{ height: "20px", width: "20px" }}
                  />
                </span>
              }
              key="1"
            >
              {/* thi part is graph */}
              {!this.props.loadingGraph && (
                <Fullscreen
                  enabled={this.state.isFull}
                  onChange={isFull => this.setState({ isFull })}
                >
                  <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={data}
                    config={myConfig}
                  />
                </Fullscreen>
              )}
              {this.props.loadingGraph && (
                <div>
                  <Spin size={"large"} />
                </div>
              )}
            </TabPane>

            <TabPane
              tab={
                <span>
                  <img
                    alt={"attribute"}
                    src={code}
                    style={{ height: "20px", width: "20px" }}
                  />
                </span>
              }
              key="2"
            >
              Code part
            </TabPane>

            <TabPane
              tab={
                <span>
                  <img
                    alt={"attribute"}
                    src={text}
                    style={{ height: "20px", width: "20px" }}
                  />
                </span>
              }
              key="3"
            >
              <Table
                bordered
                components={this.components}
                columns={this.state.columns}
                dataSource={db_data}
                style={{ marginRight: "10px" }}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <img
                    alt={"attribute"}
                    src={server}
                    style={{ height: "20px", width: "20px" }}
                  />
                </span>
              }
              key="4"
            >
              <Server />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default D3Graph;
