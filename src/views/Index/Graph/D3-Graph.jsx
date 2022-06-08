import React, { Component } from "react";
import { Tabs, PageHeader, Table, Spin, Select } from "antd";
import code from "@/assets/images/code.png";
import text from "@/assets/images/text.png";
import graph from "@/assets/images/graph.png";
import server from "@/assets/images/fuwuqi.png";
import Server from "../Server";
import db_data from "./data";
import Graphin, { Utils } from "@antv/graphin";
import { Toolbar, Legend } from "@antv/graphin-components";
// import the graph style icon
import {
  TrademarkCircleOutlined,
  ChromeOutlined,
  BranchesOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  CopyrightCircleOutlined,
  CustomerServiceOutlined,
  ShareAltOutlined
} from "@ant-design/icons";
import "@antv/graphin-components/dist/index.css";
import "@antv/graphin/dist/index.css"; // 引入Graphin CSS
import "./graph.scss";
// import data from "../../ServerInfo/data";

const { TabPane } = Tabs;
const iconMap = {
  random: <TrademarkCircleOutlined />,
  concentric: <ChromeOutlined />,
  circle: <CopyrightCircleOutlined />,
  force: <BranchesOutlined />,
  dagre: <ApartmentOutlined />,
  grid: <AppstoreOutlined />,
  radial: <ShareAltOutlined />
};

// add the layout selector
const SelectOption = Select.Option;
const LayoutSelector = props => {
  const { apis, value, onChange } = props;
  const { layouts } = apis.getInfo();
  return (
    <div style={{ position: "absolute", top: 10, left: 10 }}>
      <Select style={{ width: "120px" }} value={value} onChange={onChange}>
        {layouts.map(item => {
          const { name, disabled, desc } = item;
          const iconComponent = iconMap[name] || <CustomerServiceOutlined />;
          return (
            <SelectOption key={name} value={name} disabled={disabled}>
              {iconComponent} &nbsp;{desc}
            </SelectOption>
          );
        })}
      </Select>
    </div>
  );
};

// TODO data
const { nodes, edges } = Utils.mock(6)
  .circle()
  .graphin();
nodes.forEach((node, index) => {
  const isCompany = index % 3 === 0;
  node.style = {
    ...node.style,
    fontFamily: "graphin",
    icon: isCompany ? "company" : "user",
    primaryColor: isCompany ? "#873bf4" : "#f79e26"
  };
  node.data.type = isCompany ? "company" : "person";
});

class D3Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        name: "force",
        options: {
          preset: {
            name: "concentric" // 力导的前置布局可以人为指定，试试 grid
          },
          centripetalOptions: {
            single: 100, // 给孤立节点设置原来 （100/2）倍的向心力
            center: (node, degree) => {
              // 根据不同的节点与度数设置不同的向心力的中心点
              return {
                x: 100,
                y: 100
              };
            }
          },
          defSpringLen: (_edge, source, target) => {
            /** 默认返回的是 200 的弹簧长度 */

            /** 如果你要想要产生聚类的效果，可以考虑 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短 */
            const nodeSize = 30;
            const Sdegree = source.data.layout?.degree;
            const Tdegree = target.data.layout?.degree;
            const minDegree = Math.min(Sdegree, Tdegree);
            return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize * 2;
          }
        }
      },
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
    console.log(data);

    const { nodes, edges, legendOptions } = data;
    console.log(data);
    if (data.nodes.length === 0) {
      data = this.state.data;
    }

    // tool bar
    // const renderToolbar = (renderProps, _state) => {
    //   const { toolbarCfg } = renderProps;
    //   const tooltip = {
    //     fullscreen: "fullscreen",
    //     zoomOut: "zoomOut",
    //     zoomIn: "zoomIn"
    //   };
    //
    //   // to filter the necessary toolbars
    //   let customToolbarCfg = toolbarCfg.filter(item => {
    //     return (
    //       item.id === "fullscreen" ||
    //       item.id === "zoomOut" ||
    //       item.id === "zoomIn"
    //     );
    //   });
    //
    //   customToolbarCfg = customToolbarCfg.map(item => {
    //     console.log(item);
    //     return {
    //       ...item,
    //       name: tooltip[item.id]
    //     };
    //   });
    //   return [...customToolbarCfg];
    // };

    const handleLegend = (checked, options, LegendProps) => {
      const { apis } = LegendProps;
      // Highlight 逻辑
      const optionsMap = options.reduce((acc, curr) => {
        acc[curr.value] = curr;
        return acc;
      }, {});

      const filterNodes = nodes.filter(node => {
        return optionsMap[node.data.type].checked;
      });
      const nodeIds = filterNodes.map(c => c.id);

      apis.highlight(nodeIds);

      // Hide逻辑
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks

    return (
      <div>
        <PageHeader ghost={false} title="Graph Data" key={1} />
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
              {!this.props.loadingGraph && (
                <Graphin
                  data={{ nodes, edges }}
                  options={{
                    autoPolyEdge: true
                  }}
                  layout={this.state.layout}
                  style={{ height: "300px" }}
                >
                  <LayoutSelector
                    value={this.state.layout.name}
                    onChange={value => {
                      this.setState({
                        layout: {
                          name: value,
                          options: this.state.layout.options
                        }
                      });
                    }}
                  />
                  <Legend options={legendOptions} onChange={handleLegend} />
                  {/*<Toolbar direction="vertical" render={renderToolbar} />*/}
                  <Toolbar
                    style={{ position: "absolute", bottom: 28, left: 28 }}
                  />
                </Graphin>
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
