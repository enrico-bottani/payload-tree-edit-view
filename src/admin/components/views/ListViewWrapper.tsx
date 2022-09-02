import React, { Fragment } from "react";
import "../../scss/TreeView.scss";
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

function ListViewWrapper(props: Props) {
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
        <ListControls
            collection={collection}
            columns={columnNames}
            setColumns={setColumns}
            enableColumns={Boolean(!upload)}
            enableSort={Boolean(upload)}
        />
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
                {upload && (
                    <UploadGallery
                        docs={data.docs}
                        collection={collection}
                        onCardClick={(doc) => history.push(`${admin}/collections/${slug}/${doc.id}`)}
                    />
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
                    found. Either no
                    {' '}
                    {pluralLabel}
                    {' '}
                    exist yet or none match the filters you&apos;ve specified above.
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
        <div className={`${baseClass}__page-controls`}>
            <Paginator
                limit={data.limit}
                totalPages={data.totalPages}
                page={data.page}
                hasPrevPage={data.hasPrevPage}
                hasNextPage={data.hasNextPage}
                prevPage={data.prevPage}
                nextPage={data.nextPage}
                numberOfNeighbors={1}
            />
            {data?.totalDocs > 0 && (
                <Fragment>
                    <div className={`${baseClass}__page-info`}>
                        {(data.page * data.limit) - (data.limit - 1)}
                        -
                        {data.totalPages > 1 && data.totalPages !== data.page ? (data.limit * data.page) : data.totalDocs}
                        {' '}
                        of
                        {' '}
                        {data.totalDocs}
                    </div>
                    <PerPage
                        limits={collection?.admin?.pagination?.limits}
                        limit={limit}
                    />
                </Fragment>
            )}
        </div></>)
}
export default ListViewWrapper;