import React, {useEffect, useState, useCallback} from 'react';
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';
import {__} from '@wordpress/i18n';
import Navigation from './Navigation';
import IntegrationRow from './integration/IntegrationRow';

export default function ListTable() {
    const [integrations, setIntegrations] = useState( [] );
    const [loading, setLoading] = useState( true );

    const fetchIntegrations = useCallback(async () => {
        setLoading(true);
        let path = '/wp-json/swise/v1/integrations';

        try {
            const response = await apiFetch({
                path: addQueryArgs(path),
                method: 'GET',
                headers: {
                    'X-WP-Nonce': swiseDashboard.nonce,
                },
            });

            if (response.success) {
                setIntegrations(response.files);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIntegrations();
    }, [fetchIntegrations]);

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
        // setLoading( true );
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
                // fetchIntegrations();

                integrations.map( integration => {
                    if ( integration.id === id ) {
                        integration.post_status = postStatus === 'publish' ? 'draft' : 'publish';
                    }
                    return integration;
                });
            }
        } )
        .catch( ( error ) => {
            console.log( error );
        } )
        .finally( () => {
            // setLoading( false );
        });
    }

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
                                {integrations.map((integration) => (
                                    <IntegrationRow
                                        key={integration.id}
                                        integration={integration}
                                        handleDelete={handleDelete}
                                        handleStatusChange={handleStatusChange}
                                    />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
