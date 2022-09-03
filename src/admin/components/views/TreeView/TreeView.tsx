import React, { Fragment } from "react";
import "./TreeView.scss";
import { useHistory } from 'react-router-dom';

import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import UploadGallery from 'payload/dist/admin/components/elements/UploadGallery';
import Paginator from 'payload/dist/admin/components/elements/Paginator';
import ListControls from 'payload/dist/admin/components/elements/ListControls';
import Button from 'payload/dist/admin/components/elements/Button';
import Table from 'payload/dist/admin/components/elements/Table';
import { Props } from "payload/dist/admin/components/views/collections/List/types";
import PerPage from 'payload/dist/admin/components/elements/PerPage';
import { RelationshipProvider } from 'payload/dist/admin/components/views/collections/List/RelationshipProvider';

const baseClass = 'collection-list';
function TreeView(props: Props) {
    const baseClass = 'collection-list';
    const {
        collection,
        collection: {
            upload,
            slug,
            labels: {
                singular: singularLabel,
                plural: pluralLabel,
            },
            admin: {
                description,
            } = {},
        },
        data,
        newDocumentURL,
        limit,
        tableColumns,
        columnNames,
        setColumns,
        hasCreatePermission,
    } = props;
    const { routes: { admin } } = useConfig();
    const history = useHistory();
    return (<>

        {(data.docs && data.docs.length > 0) && (
            <React.Fragment>
                {!upload && (
                    <RelationshipProvider>
                        <Table
                            data={data.docs}
                            columns={tableColumns}
                        />
                    </RelationshipProvider>
                )}
            </React.Fragment>
        )}
        {data.docs && data.docs.length === 0 && (
            <div className={`${baseClass}__no-results`}>
                <p>
                    No
                    {' '}
                    {pluralLabel}
                    {' '}
                    found. No
                    {' '}
                    {pluralLabel}
                    {' '}
                    exist yet.
                </p>
                {hasCreatePermission && (
                    <Button
                        el="link"
                        to={newDocumentURL}
                    >
                        Create new
                        {' '}
                        {singularLabel}
                    </Button>
                )}
            </div>
        )}
        </>)
}
export default TreeView;