import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    htmlContent: ""
  };

  onEditorStateChange = editorState => {
    this.setState(
      {
        editorState,
        htmlConent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      },
      // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    );
  };

  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper"
          editorClassName="editor"
          editorStyle={{ border: "1px solid #f1f1f1" }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}

export default EditorConvertToHTML;
