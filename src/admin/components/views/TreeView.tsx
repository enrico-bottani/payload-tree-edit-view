import React, { useState } from "react";
import "../../scss/TreeView.scss";
import { useHistory } from 'react-router-dom';

import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import Eyebrow from 'payload/dist/admin/components/elements/Eyebrow';
import Pill from 'payload/dist/admin/components/elements/Pill';
import Meta from 'payload/dist/admin/components/utilities/Meta';
import { Props } from "payload/dist/admin/components/views/collections/List/types";
import ViewDescription from 'payload/dist/admin/components/elements/ViewDescription';
import { Gutter } from 'payload/dist/admin/components/elements/Gutter';
import ListViewWrapper from "./ListViewWrapper";

const baseClass = 'collection-list';
function TreeView(props: Props) {
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
  const [listView, setListView] = useState(true);
  return (
    <div>I'm the treeview</div>
  );
}
export default TreeView;