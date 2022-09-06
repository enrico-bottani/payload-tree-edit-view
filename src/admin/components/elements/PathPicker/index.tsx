import { useHistory } from 'react-router-dom';
import { Props } from "./types";
import { useSearchParams } from '../../utilities/SearchParams';
import queryString from 'qs';
import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';

function PathPicker(props: Props) {
    const history = useHistory();
    const params = useSearchParams();
    const {
        node,
        totalPages = null,
        page: currentPage,
        hasPrevPage = false,
        hasNextPage = false,
        collection: {
            slug
        },
        prevPage = null,
        nextPage = null,
        numberOfNeighbors = 1,
        disableHistoryChange = false,
        onChange,
    } = props;
    const { serverURL, routes: { api } } = useConfig();
    const [fetchURL, setFetchURL] = useState<string>(`${serverURL}${api}/${slug}`);
    const [path, setPath] = useState<any>();

    const updatePage = (page) => {
        if (!disableHistoryChange) {
            const newParams = {
                ...params,
            };

            newParams.page = page;
            history.push({ search: queryString.stringify(newParams, { addQueryPrefix: true }) });
        }

        if (typeof onChange === 'function') onChange(page);
    };

    async function getPathFromNode(nodeId: string): Promise<any> {
        const stringifiedQuery = qs.stringify({
            depth: 0,
        }, { addQueryPrefix: true });

        return await fetch(`${fetchURL}/${nodeId}${stringifiedQuery}`).then(response => response.json());
    }



    useEffect(() => {
        getPathFromNode(node)
            .then(n => {
                setPath(() => n)
                console.log(n)
            });
    }, [node]);

    if (path == null) return <></>
    return (<p>{path.name}</p>)
}
export default PathPicker;