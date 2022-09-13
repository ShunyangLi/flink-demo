import React, { Component } from "react";
import { Tag, Table, Divider, Button, Form, Modal, Input, Select } from "antd";
// import { Layout } from "antd";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

class Config extends Component {
  // Modal
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    //Table
    const dataSource = [
      {
        workDir: "localhost",
        user: "Admin",
        group: "Admin",
        workers: "4",
        machines: "0001",
        hostFile: "C:\\mycode\\min.dec",
        state: "Live",
        key: "1"
      }
    ];
    //定义表头
    const columns = [
      {
        title: "Server", //列名称
        dataIndex: "workDir", //数据源的字段名
        key: "workDir"
      },
      {
        title: "User",
        dataIndex: "user",
        key: "user"
      },
      {
        title: "Group",
        dataIndex: "group",
        key: "group"
      },
      {
        title: "Threads",
        dataIndex: "workers",
        key: "workers"
      },
      {
        title: "Server ID",
        dataIndex: "machines",
        key: "machines"
      },
      {
        title: "Status",
        dataIndex: "state",
        key: "state",
        render: state => (
          <span>
            <Tag color={"volcano"} key={"state"}>
              {"Live"}
            </Tag>
            {/*    启用 color 换为blue*/}
          </span>
        )
      }
    ];

    //表单配置
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    //Select
    const { Option } = Select;

    return (
      <div>
        <CustomBreadcrumb arr={["Config"]} />
        <div style={{ margin: "0.5em" }}>
          {/*<Button type="primary" onClick={this.showModal}>*/}
          {/*  New*/}
          {/*</Button>*/}
          <Modal
            visible={this.state.visible}
            // loading={this.state.loading}
            title="Add config"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={this.handleOk}>
                Upload
              </Button>
            ]}
          >
            <Form {...formItemLayout}>
              <Form.Item label={"webdir"}>
                {" "}
                <Input />{" "}
              </Form.Item>
              <Form.Item label={"user"}>
                {" "}
                <Input />{" "}
              </Form.Item>
              <Form.Item label={"group"}>
                <Select>
                  <Option value="group1">Group1</Option>
                  <Option value="group2">Group2</Option>
                  <Option value="group3">Group3</Option>
                </Select>
              </Form.Item>
              <Form.Item label={"workers"}>
                <Tag>worker1</Tag> <Tag>worker2</Tag>
                {/*还有亿点点细节*/}
              </Form.Item>
              <Form.Item label={"machines"}>
                <Tag>machine1</Tag> <Tag>machine2</Tag>
                {/*还有亿点点细节*/}
              </Form.Item>
              <Form.Item label={"Host files"}>
                {" "}
                <Input type={"file"} />{" "}
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className="tableContainer">
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    );
  }
}

export default Config;
