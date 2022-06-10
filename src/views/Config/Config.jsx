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
        user: "管理员",
        group: "管理员",
        workers: "4",
        machines: "0001",
        hostFile: "C:\\mycode\\min.dec",
        state: "活跃",
        key: "1"
      }
    ];
    //定义表头
    const columns = [
      {
        title: "服务器", //列名称
        dataIndex: "workDir", //数据源的字段名
        key: "workDir"
      },
      {
        title: "用户",
        dataIndex: "user",
        key: "user"
      },
      {
        title: "组",
        dataIndex: "group",
        key: "group"
      },
      {
        title: "线程数量",
        dataIndex: "workers",
        key: "workers"
      },
      {
        title: "服务器编号",
        dataIndex: "machines",
        key: "machines"
      },
      {
        title: "状态",
        dataIndex: "state",
        key: "state",
        render: state => (
          <span>
            <Tag color={"volcano"} key={"state"}>
              {"活跃"}
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
        <CustomBreadcrumb arr={["配置"]} />
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
