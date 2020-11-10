import React, { Component } from "react";
import { Form, Input, Modal, Select } from "antd";
const { Option } = Select;

export default class NewDB extends Component {
  render() {
    const {
      getFieldDecorator,
      submit_form,
      handleCancel,
      visible
    } = this.props;

    return (
      <div>
        <Modal
          title="Add new database"
          visible={visible}
          onOk={submit_form}
          onCancel={handleCancel}
        >
          <div style={{ height: "500px", overflow: "scroll" }}>
            <Form>
              <Form.Item label="Group Name">
                {getFieldDecorator("groupName", {
                  rules: [
                    { required: true, message: "Please enter group name" }
                  ]
                })(<Input placeholder="Group name" />)}
              </Form.Item>

              {/* graph type */}
              <Form.Item label="Graph Type">
                {getFieldDecorator("graphType", {
                  rules: [
                    { required: true, message: "Please enter graph type" }
                  ]
                })(
                  <Select placeholder="Please enter graph type">
                    <Option value="StaticGraph">Static Graph</Option>
                    <Option value="GraphMap">Graph Map</Option>
                  </Select>
                )}
              </Form.Item>

              {/* label */}
              <Form.Item label="Graph Label">
                {getFieldDecorator("graphLabel", {
                  rules: [
                    { required: true, message: "Please enter graph label" }
                  ]
                })(
                  <Select placeholder="Please enter graph label">
                    <Option value="Integer">Integer</Option>
                    <Option value="String">String</Option>
                  </Select>
                )}
              </Form.Item>

              {/* id type */}
              <Form.Item label="ID type">
                {getFieldDecorator("idType", {
                  rules: [{ required: true, message: "Please enter ID type" }]
                })(
                  <Select placeholder="Please enter ID type">
                    <Option value="u32">u32</Option>
                    <Option value="u64">u64</Option>
                  </Select>
                )}
              </Form.Item>

              {/* reader type */}
              <Form.Item label="Reader type">
                {getFieldDecorator("readerType", {
                  rules: [
                    { required: true, message: "Please enter reader type" }
                  ]
                })(
                  <Select placeholder="Please enter reader type">
                    <Option value="Local">Local</Option>
                    <Option value="HDFS">HDFS</Option>
                  </Select>
                )}
              </Form.Item>
              {/* Splitter */}
              <Form.Item label="Splitter">
                {getFieldDecorator("splitter", {
                  rules: [{ required: true, message: "Please enter splitter" }]
                })(
                  <Select placeholder="Please enter splitter">
                    <Option value="Tab">Tab</Option>
                    <Option value="Comma">Comma</Option>
                    <Option value="Space">Space</Option>
                    <Option value="|">|</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Directed">
                {getFieldDecorator("directed", {
                  rules: [{ required: true, message: "Please enter directed" }]
                })(
                  <Select placeholder="Please enter directed">
                    <Option value="Directed">Directed</Option>
                    <Option value="Undirected">Undirected</Option>
                  </Select>
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
