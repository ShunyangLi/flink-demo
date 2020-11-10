import React, { Component } from "react";
import { Button, Form } from "antd";
import DBname from "./DBName";
import NewDB from "./NewDB/NewDB";

class Database extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  show_add_database = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  submit_form = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // then do what
        console.log(values);
      }
    });
    this.setState({
      visible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <NewDB
          getFieldDecorator={getFieldDecorator}
          submit_form={this.submit_form}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
        />
        <div>
          <Button
            type={"primary"}
            style={{ marginBottom: "10px" }}
            onClick={this.show_add_database.bind(this)}
          >
            New database
          </Button>
          {/* all the database name */}
          <DBname />
        </div>
      </div>
    );
  }
}

export default Form.create()(Database);
