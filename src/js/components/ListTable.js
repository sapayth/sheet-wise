import React, {useEffect, useState} from 'react';
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';
import {__} from '@wordpress/i18n';
import Navigation from './Navigation';

export default function ListTable() {
    const [integrations, setIntegrations] = useState( [] );
    const [loading, setLoading] = useState( true );

    useEffect( () => {
        fetchIntegrations();
    }, [] );

    const fetchIntegrations = async () => {
        let path = '/wp-json/swise/v1/integrations';

        apiFetch( {
            path: addQueryArgs( path ),
            method: 'GET',
            headers: {
                'X-WP-Nonce': swiseDashboard.nonce,
            },
        } )
            .then( ( response ) => {
                if (response.success) {
                    setIntegrations( response.files );
                }
            } )
            .catch( ( error ) => {
                console.log( error );
            } )
            .finally( () => {
                setLoading( false );
            } );
    };

    const handleDelete = async ( event ) => {
        if (!confirm( __( 'Are you sure you want to delete this integration?', 'sheet-wise' ) )) {
            return;
        }

        const integrationId = event.target.getAttribute( 'data-id' );
        let path = '/wp-json/swise/v1/integrations/' + integrationId;

        await apiFetch( {
            path: addQueryArgs( path ),
            method: 'DELETE',
            headers: {
                'X-WP-Nonce': swiseDashboard.nonce,
            },
        } )
        .then( ( response ) => {
            if (response.success) {
                fetchIntegrations();
            }
        } )
        .catch( ( error ) => {
            console.log( error );
        } );
    }

    const handleStatusChange = async ( event ) => {
        const id = event.target.getAttribute( 'data-id' );
        const postStatus = event.target.getAttribute( 'data-post-status' );
        let path = '/wp-json/swise/v1/integrations/' + id;

        const data = {
            value: postStatus === 'publish' ? 'draft' : 'publish',
            id: id,
            edit_single: true,
            row_name: 'post_status',
        };

        await apiFetch( {
            path: addQueryArgs( path ),
            method: 'PATCH',
            headers: {
                'X-WP-Nonce': swiseDashboard.nonce,
            },
            body: JSON.stringify( data ),
        } )
        .then( ( response ) => {
            if (response.success) {
                fetchIntegrations();
            }
        } )
        .catch( ( error ) => {
            console.log( error );
        } );
    }

    const toggleBtnClass = {
        draft: 'swise-bg-gray-200',
        publish: 'swise-bg-indigo-600',
    };

    const toggleSpanClass = {
        draft: 'swise-translate-x-0',
        publish: 'swise-translate-x-5',
    };

    return (
        <div className="swise-flow-root">
            <Navigation />
            <div className="swise--mx-4 swise--my-2 swise-overflow-x-auto sm:swise--mx-6 lg:swise--mx-8">
                {loading &&
                    <div className="swise-h-[calc(100vh-200px)] swise-flex swise-items-center swise-justify-center">
                        <span
                            className="swise-loading swise-loading-dots swise-loading-lg swise-text-purple-700"></span>
                    </div>
                }
                <div
                    className="swise-inline-block swise-min-w-full swise-py-2 swise-align-middle sm:swise-px-6 lg:swise-px-8">
                    {!loading &&
                        <div
                            className="swise-overflow-hidden swise-shadow swise-ring-1 swise-ring-black swise-ring-opacity-5 sm:swise-rounded-lg">
                            <table className="swise-min-w-full swise-divide-y swise-divide-gray-300">
                                <thead className="swise-bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="swise-py-3.5 swise-pl-4 swise-pr-3 swise-text-left swise-text-sm swise-font-semibold swise-text-gray-900 sm:swise-pl-6">
                                        {__( 'Name', 'sheet-wise' )}
                                    </th>
                                    <th scope="col"
                                        className="swise-px-3 swise-py-3.5 swise-text-left swise-text-sm swise-font-semibold swise-text-gray-900">
                                        {__( 'ID', 'sheet-wise' )}
                                    </th>
                                    <th scope="col"
                                        className="swise-px-3 swise-py-3.5 swise-text-left swise-text-sm swise-font-semibold swise-text-gray-900">
                                        {__( 'Edit', 'sheet-wise' )}
                                    </th>
                                    <th scope="col"
                                        className="swise-px-3 swise-py-3.5 swise-text-left swise-text-sm swise-font-semibold swise-text-gray-900">
                                        {__( 'Live/Pause', 'sheet-wise' )}
                                    </th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody className="swise-divide-y swise-divide-gray-200 swise-bg-white">
                                {integrations.map( integration => {
                                    return (
                                        <tr key={integration.id}>
                                            <td className="swise-whitespace-nowrap swise-py-4 swise-pl-4 swise-pr-3 swise-text-sm swise-font-medium swise-text-gray-900 sm:swise-pl-6">{integration.title}</td>
                                            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">{integration.id}</td>
                                            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">
                                                <a href={swiseDashboard.pageURL + '#/integration/' + integration.id}
                                                   className="swise-text-indigo-600 hover:swise-text-indigo-900">{__( 'Edit', 'integration-wise' )}
                                                    <span
                                                        className="swise-sr-only">, {integration.title}</span></a>
                                            </td>
                                            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">
                                                <button
                                                    onClick={handleStatusChange}
                                                    data-id={integration.id}
                                                    data-post-status={integration.post_status}
                                                    type="button"
                                                    className={`swise-relative swise-inline-flex swise-h-6 swise-w-11 swise-flex-shrink-0 swise-cursor-pointer swise-rounded-full swise-border-2 swise-border-transparent swise-transition-colors swise-duration-200 swise-ease-in-out ${toggleBtnClass[integration.post_status]}`}
                                                    role="switch"
                                                    aria-checked="false">
                                                    <span
                                                        aria-hidden="true"
                                                        className={`swise-pointer-events-none swise-inline-block swise-h-5 swise-w-5 swise-transform swise-rounded-full swise-bg-white swise-shadow swise-ring-0 swise-transition swise-duration-200 swise-ease-in-out ${toggleSpanClass[integration.post_status]}`}></span>
                                                </button>
                                            </td>
                                            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">
                                                <button
                                                    className="swise-text-red-600 hover:swise-text-red-900"
                                                    onClick={handleDelete}
                                                    data-id={integration.id}
                                                >
                                                    {__( 'Delete', 'integration-wise' )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                } )}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}