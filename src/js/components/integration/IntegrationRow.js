import {__} from '@wordpress/i18n';
import React, {useState} from 'react';
import { ToggleControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';

export default function IntegrationRow( {integration, handleDelete, setNotices} ) {
    const [status, setStatus] = useState( integration.post_status === 'publish' );

    const handleStatusChange = async ( id, postStatus ) => {
        let path = '/wp-json/swise/v1/integrations/' + id;

        const data = {
            value: postStatus,
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
                if ( response.success ) {
                    setStatus( postStatus === 'publish' );
                    setNotices( [
                        {
                            type: 'success',
                            message: response.message,
                        },
                    ] );
                } else {
                    setNotices( [
                        {
                            type: 'error',
                            message: response.message,
                        },
                    ] );
                }
            } )
            .catch( ( error ) => {
                console.log( error );
            } )
            .finally( () => {
                // setLoading( false );
            });
    };

    return (
        <tr key={integration.id} className="even:swise-bg-gray-50">
            <td className="swise-whitespace-nowrap swise-py-4 swise-pl-4 swise-pr-3 swise-text-sm swise-font-medium swise-text-gray-900 sm:swise-pl-6">{integration.title}</td>
            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">{integration.id}</td>
            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">
                <a href={swiseDashboard.pageURL + '#/integration/' + integration.id}
                   className="swise-text-indigo-600 hover:swise-text-indigo-900">{__( 'Edit', 'integration-wise' )}
                    <span
                        className="swise-sr-only">, {integration.title}</span></a>
            </td>
            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">
                <ToggleControl
                    __nextHasNoMarginBottom
                    checked={ status }
                    onChange={ (newValue) => {
                        handleStatusChange( integration.id, newValue ? 'publish' : 'draft' );
                        setStatus( newValue );
                    } }
                />
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
}