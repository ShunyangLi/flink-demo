import React, { Component } from "react";
import { createCypherEditor } from "cypher-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/edit/closebrackets";
import "cypher-codemirror/dist/cypher-codemirror-all.css";
import { neo4jSchema, codeMirrorSettings } from "./common";
import "./index.scss";

export default class CodeEditer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "cypher cypher-dark",
      input: null,
      editorSupport: null,
      editor: null,
      code: undefined
    };
  }

  componentDidMount() {
    const { editor, editorSupport } = createCypherEditor(
      this.input,
      codeMirrorSettings
    );
    editorSupport.setSchema(neo4jSchema);
    // editor.on('change', this.handle_value.bind(this));
    // set the init value
    this.setState({
      code: editor.editorSupport.input
    });
    this.setState({
      editor: editor,
      editorSupport: editorSupport
    });
    // this.editor = editor;
    // this.editorSupport = editorSupport;
    // editor.on('change', this.set_change.bind(this));
    editor.on("keyup", this.set_change.bind(this));
    // editor.on('paste', this.set_change.bind(this));
    // editor.on('change', this.set_change.bind(this));
    editor.on("keydown", this.set_change.bind(this));
    // editor.on('change', this.set_change(editor.getValue()));
  }

  set_change = value => {
    this.props.set_code(this.state.editor.getValue());
    // console.log(this.input.innerText.match(/MATCH.*/g).join(' '));
    // this.props.set_code(this.input.innerText.match(/MATCH.*/g).join(" "));
  };

  render() {
    const setInput = input => {
      this.input = input;
    };
    return (
      <div className="Codemirror-Container code-edit-area" ref={setInput} />
    );
  }
}
