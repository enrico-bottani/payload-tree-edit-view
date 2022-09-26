import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./TreeView.scss";

import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import Paginator from 'payload/dist/admin/components/elements/Paginator';
import Button from 'payload/dist/admin/components/elements/Button';
import Table from '../../elements/Table';
import { Props, TreeViewURLParams } from "./types";
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

    // Save fetchURL
    const { serverURL, routes: { api } } = useConfig();
    const [fetchURL] = useState<string>(`${serverURL}${api}/${slug}`);
    const [urlParam, setUrlParam] = useState(getQueryParams());
    const [data, setData] = useState<PaginatedDocs>();


    useEffect(() => {
        getPosts().then(response => response.json()).then(body => setData(body))
    }, [limit, useLocation().search])

    return (<>
        <PathPicker {...props} node={urlParam.node as string}
            onChange={(node) => setUrlParam(urlP => { return { page: urlP.page, node: node } })} />
        {(data && data.docs && data.docs.length > 0) && (
            <>
                {!upload && (
                    <RelationshipProvider>
                        <Table
                            data={data.docs}
                            columns={tableColumns}
                        />
                    </RelationshipProvider>
                )}
            </>
        )}
        {data && data.docs && data.docs.length === 0 && (
            noItemsFoundFragment()
        )}
        {data && (paginatorFragment())}
    </>)

    // FUNCTIONS
    // ---------
    async function getPosts(): Promise<Response> {
        const query = {
            id: {
                equals: urlParam.node,
            },
        }
        const stringifiedQuery = qs.stringify({
            depth: 0,
            page: urlParam.page,
            limit: limit,
            where: query
        }, { addQueryPrefix: true });

        return await fetch(`${fetchURL}${stringifiedQuery}`);
    }

    // UI Fragments
    function paginatorFragment() {
        return <div className={`${baseClass}__page-controls`}>
            <Paginator
                limit={data.limit}
                totalPages={data.totalPages}
                page={data.page}
                hasPrevPage={data.hasPrevPage}
                hasNextPage={data.hasNextPage}
                prevPage={data.prevPage}
                nextPage={data.nextPage}
                numberOfNeighbors={1} />
            {data?.totalDocs > 0 && (
                // Display page 1-5 and per page elements
                <>
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
                        limit={limit} />
                </>
            )}
        </div>;
    }

    function noItemsFoundFragment() {
        return <div className={`${baseClass}__no-results`}>
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
        </div>;
    }
}
export default TreeView;

function getQueryParams(): TreeViewURLParams {
    let urlParams = qs.parse(
        useLocation().search,
        { ignoreQueryPrefix: true, depth: 10 },
    );
    let rtn: TreeViewURLParams = {
        node: urlParams.node as string,
        page: urlParams.page ? Number(urlParams.page) : 0
    }
    return rtn;
}
