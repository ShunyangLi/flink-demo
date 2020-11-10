import React, { Component } from "react";
import { Select, Upload, Button, message, Input } from "antd";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import "./index.scss";

const { Option } = Select;

class Import extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "csv",
      loading: false,
      fileList: []
    };
  }

  onChange = value => {
    this.setState({
      search: value
    });
  };

  handleUpload = () => {
    this.setState({
      loading: !this.state.loading
    });
    setTimeout(() => {
      this.setState({
        loading: !this.state.loading
      });
    }, 1000);
  };

  onBlur() {
    console.log("blur");
  }

  onFocus() {
    console.log("focus");
  }

  onSearch(val) {
    console.log("search:", val);
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div>
        <CustomBreadcrumb arr={["import data"]} />
        <div className={"uploadArea"}>
          <div>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a import method"
              optionFilterProp="csv"
              onChange={this.onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="csv">csv</Option>
              <Option value="hdfs">hdfs</Option>
              <Option value="network">network</Option>
            </Select>

            {(this.state.search === "csv" || this.state.search === "hdfs") && (
              <div>
                <Upload {...props}>
                  <Button>Select File</Button>
                </Upload>
                <Button
                  type="primary"
                  onClick={this.handleUpload}
                  disabled={fileList.length === 0}
                  loading={uploading}
                  style={{ marginTop: 16 }}
                >
                  {uploading ? "Uploading" : "Start Upload"}
                </Button>
              </div>
            )}

            {this.state.search === "network" && (
              <div>
                <Input
                  addonBefore="http://"
                  addonAfter=".com"
                  defaultValue="mysite"
                />
                <Button> Start upload</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Import;
