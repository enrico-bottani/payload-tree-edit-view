import { useHistory } from 'react-router-dom';
import { Props } from "./types";
import { useSearchParams } from '../../utilities/SearchParams';
import queryString from 'qs';
import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import Chevron from 'payload/dist/admin/components/icons/Chevron';
import "./index.scss"
function PathPicker(props: Props) {

    const {
        node,
        page: currentPage,
        collection: {
            slug
        },
        disableHistoryChange = false,
        onChange,
    } = props;
    const history = useHistory();
    const { serverURL, routes: { api } } = useConfig();
    const [fetchURL, setFetchURL] = useState<string>(`${serverURL}${api}/${slug}`);
    const [path, setPath] = useState<any>();

    const updatePage = (node: string) => {
        const params = qs.parse(
            location.search,
            { ignoreQueryPrefix: true, depth: 10 },
        );
        if (!disableHistoryChange) {
            const newParams = {
                ...params,
            };

            newParams.node = node;
            history.push({ search: queryString.stringify(newParams, { addQueryPrefix: true }) });
        }

        if (typeof onChange === 'function') onChange(node);
    };

    async function getPathFromNode(nodeId: string): Promise<any> {
        const stringifiedQuery = qs.stringify({
            depth: 0,
        }, { addQueryPrefix: true });
        if (nodeId)
            return fetch(`${fetchURL}/${nodeId}/path`).then(response => response.json());
    }

    useEffect(() => {
        getPathFromNode(node)
            .then(body => {
                var p = [];
                for (let i = 0; i < body.response.length; i++) {
                    p = [<button onClick={() => updatePage(body.response[i].id)}>
                        <span>{body.response[i].name}</span>
                        {i !== 0 && <Chevron />}
                    </button>, ...p]
                }
                setPath(() => p)
            });
    }, [node]);

    if (path == undefined) return <></>
    return (<div className='step-nav'>{path}</div>)
}
export default PathPicker;