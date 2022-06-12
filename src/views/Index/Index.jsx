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
      loading: false,
      tdata: []
    };
  }

  // set code when the code chanage
  set_code = code => {
    this.setState({
      code: code
    });
  };

  set_graph = () => {
    this.setState({
      loading: true
    });

    message.success("正在查询");

    setTimeout(() => {
      axios
        .get(`${API}/table/${this.state.pattern}`, {})
        .then(res => {
          // console.log(res.data);
          console.log(res.data);
          this.setState({
            tdata: res.data
          });
          message.success("数据查询成功");
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          console.log(err);
          message.error("网络错误");
        });
    }, 500);
  };

  change_pattern = e => {
    this.setState({
      pattern: e.target.value
    });
  };

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
              <TableView
                data={this.state.data}
                tdata={this.state.tdata}
                pattern={this.state.pattern}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Index);
