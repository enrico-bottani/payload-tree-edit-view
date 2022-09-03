import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import Eyebrow from 'payload/dist/admin/components/elements/Eyebrow';
import Pill from 'payload/dist/admin/components/elements/Pill';
import Meta from 'payload/dist/admin/components/utilities/Meta';
import { Props } from "payload/dist/admin/components/views/collections/List/types";
import ViewDescription from 'payload/dist/admin/components/elements/ViewDescription';
import { Gutter } from 'payload/dist/admin/components/elements/Gutter';
import ListViewWrapper from "./ListViewWrapper";
import TreeView from "./TreeView/TreeView";

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
  const [listView, setListView] = useState(false);
  return (
    <div className={baseClass}>
      <Meta
        title={collection.labels.plural}
      />
      <Eyebrow />
      <Gutter className={`${baseClass}__wrap`}>
        <header className={`${baseClass}__header`}>
          <h1>{pluralLabel}</h1>
          {hasCreatePermission && (
            <Pill to={newDocumentURL}>
              Create New
            </Pill>
          )}
          {description && (
            <div className={`${baseClass}__sub-header`}>
              <ViewDescription description={description} />
            </div>
          )}
        </header>
        <div className="mb-2">
          <button onClick={() => setListView(() => false)}
            className={"pill pill--has-link pill--has-action mr-1 " + (listView ? "pill--style-light" : "pill--style-dark")}>
            TreeView
          </button>
          <button onClick={() => setListView(() => true)} className={"pill pill--has-link pill--has-action "
            + (listView ? "pill--style-dark" : "pill--style-light")}>ListView</button>
        </div>
        {
          listView ? <ListViewWrapper {...props}></ListViewWrapper> : <TreeView {...props}></TreeView>
        }
      </Gutter>
    </div>
  );
}
export default SwitchView;