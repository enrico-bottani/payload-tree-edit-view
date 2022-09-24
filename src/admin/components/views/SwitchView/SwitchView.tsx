import React, { useState } from "react";
import { Props } from "payload/dist/admin/components/views/collections/List/types";
import { Gutter } from 'payload/dist/admin/components/elements/Gutter';
import TreeView from "../TreeView/TreeView";
import DefaultList from "payload/dist/admin/components/views/collections/List/Default"

const baseClass = 'collection-list';
function SwitchView(props: Props) {
  const {
    collection,
    collection: {
      labels: {
        plural: pluralLabel,
      },
      admin: {
        description,
      } = {},
    },
    newDocumentURL,
    hasCreatePermission,
  } = props;
  const [listViewEnabled, setListView] = useState(false);
  return (
    <>

      <button onClick={() => setListView(() => false)}
        className={"pill pill--has-link pill--has-action mr-1 " + (listViewEnabled ? "pill--style-light" : "pill--style-dark")}>
        TreeView
      </button>
      <button onClick={() => setListView(() => true)} className={"pill pill--has-link pill--has-action "
        + (listViewEnabled ? "pill--style-dark" : "pill--style-light")}>ListView</button>
      {
        listViewEnabled ? <DefaultList {...props}></DefaultList> : <TreeView {...props}></TreeView>
      }
    </>
  );
}
export default SwitchView;