import React from "react";
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
          <button className="pill pill--style-light pill--has-link pill--has-action mr-1">TreeView</button>
          <button className="pill pill--style-dark pill--has-link pill--has-action">ListView</button>
        </div>
        <ListViewWrapper {...props}></ListViewWrapper>
      </Gutter>
    </div>
  );
}
export default TreeView;