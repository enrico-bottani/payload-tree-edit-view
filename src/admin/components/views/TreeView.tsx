import React from "react";
import DefaultListView from "payload/dist/admin/components/views/collections/List/Default";
import "../../scss/TreeView.scss";
function TreeView(props) {
  return <div className="container">
    <div className="top">
      <button className="btn btn--style-secondary top-item">TreeView</button>
      <button className="btn btn--style-secondary top-item">ListView</button>
    </div>
    <div className="main">
      <DefaultListView {...props}></DefaultListView>
    </div>
  </div>;
}
export default TreeView;