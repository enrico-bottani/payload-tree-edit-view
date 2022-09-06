import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./TreeView.scss";

import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import Paginator from 'payload/dist/admin/components/elements/Paginator';
import Button from 'payload/dist/admin/components/elements/Button';
import Table from '../../elements/Table';
import { Props } from "./types";
import PerPage from 'payload/dist/admin/components/elements/PerPage';
import { RelationshipProvider } from 'payload/dist/admin/components/views/collections/List/RelationshipProvider';
import qs from 'qs';
import { PaginatedDocs } from "payload/dist/mongoose/types";
import PathPicker from "../../elements/PathPicker";
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
        limit,
        newDocumentURL,
        tableColumns,
        hasCreatePermission,
    } = props;

    const query = {
        name: {
            equals: 'home',
        },
    }
    const { serverURL, routes: { api } } = useConfig();
    const [fetchURL, setFetchURL] = useState<string>(`${serverURL}${api}/${slug}`);

    const { page, sort, where, node } = qs.parse(
        useLocation().search,
        { ignoreQueryPrefix: true, depth: 10 },
    );

    const [data, setData] = useState<PaginatedDocs>();
    const getPosts = async (): Promise<Response> => {
        const stringifiedQuery = qs.stringify({
            depth: 0,
            page: page,
            limit: limit,
            where: query
        }, { addQueryPrefix: true });

        return await fetch(`${fetchURL}${stringifiedQuery}`);
    }


    useEffect(() => {
        console.log("use effect");
        getPosts().then(response => response.json()).then(body => setData(body))
    }, [page, limit])

    return (<>
        <PathPicker {...props} node={node as string}/>
        {(data && data.docs && data.docs.length > 0) && (
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
        {data && data.docs && data.docs.length === 0 && (
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
        {data && (
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
            </div>)}
    </>)
}
export default TreeView;