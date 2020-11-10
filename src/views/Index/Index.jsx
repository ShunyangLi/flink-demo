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
        links: [],
        isFull: false
      }
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
      .post(`${API}/patmat-api/parse-cypher`, {
        cypher: this.state.code
      })
      .then(res => {
        console.log(res.data);
        let { data } = this.state;
        data.nodes = res.data.nodes;
        data.links = res.data.links;

        this.setState({
          data: data,
          loadingGraph: !this.state.loadingGraph
        });
      })
      .catch(err => {
        // console.log(err.response);
        message.error(err.response.message);
      });
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
