import React, {useEffect, useState} from 'react';
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';

import { __ } from '@wordpress/i18n';

export default function NewIntegration() {
    const dataSource = [
        { id: 'wp-new-user', name: __( 'Wordpress New User', 'sheet-wise' ) },
        { id: 'wp-user-profile-update', name: __( 'Wordpress User Profile Update', 'sheet-wise' ) },
        { id: 'wp-delete-user', name: __( 'Wordpress Delete User', 'sheet-wise' ) },
        { id: 'wp-user-login', name: __( 'Wordpress User Login', 'sheet-wise' ) },
        { id: 'wp-user-logout', name: __( 'Wordpress User Logout', 'sheet-wise' ) },
        { id: 'wp-new-post', name: __( 'Wordpress New Post', 'sheet-wise' ) },
        { id: 'wp-edit-post', name: __( 'Wordpress Edit Post', 'sheet-wise' ) },
        { id: 'wp-delete-post', name: __( 'Wordpress Delete Post', 'sheet-wise' ) },
        { id: 'wp-page', name: __( 'Wordpress Page', 'sheet-wise' ) },
        { id: 'wp-comment', name: __( 'Wordpress Comment', 'sheet-wise' ) },
        { id: 'wp-edit-comment', name: __( 'Wordpress Edit Comment', 'sheet-wise' ) },
    ];
    const [sheets, setSheets] = useState( [] );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect( () => {

        const fetchSheets = async () => {
            let path = '/wp-json/swise/v1/sheets';

            apiFetch( {
                path: addQueryArgs( path ),
                method: 'GET',
                headers: {
                    'X-WP-Nonce': swiseDashboard.nonce,
                },
            } )
            .then( ( response ) => {
                if (response.success) {
                    setSheets( response.files );
                }
            } )
            .catch( ( error ) => {
                console.log( error );
            } )
            .finally( () => {
            });
        };

        fetchSheets();

    }, [] );

    return (
        <div className="swise-shadow-md sm:swise-rounded-lg">
            <table
                className="swise-w-full swise-mt-12 swise-text-sm swise-text-left swise-text-gray-500">
                <tbody>
                <tr className="odd:swise-bg-white even:swise-bg-gray-50 swise-border-b">
                    <td
                        className="swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900">
                        {__( 'Integration Title', 'sheet-wise' )}
                    </td>
                    <td className="swise-px-6 swise-py-4">
                        <input
                            className="swise-font-medium swise-text-gray-900 swise-w-full swise-max-w-full !swise-border-gray-300"
                            type="text"/>
                    </td>
                </tr>
                <tr className="odd:swise-bg-white even:swise-bg-gray-50 swise-border-b">
                    <td
                        className="swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900 swise-whitespace-nowrap">
                        {__( 'Data Source', 'sheet-wise' )}
                    </td>
                    <td className="swise-px-6 swise-py-4">
                        <select
                            name="DataSourceID"
                            id="DataSourceID"
                            className="swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full">
                            <option value="">select ...</option>
                            {dataSource.map( source => <option  key={source.id} value={source.id}>{ source.name }</option> )}
                        </select>
                    </td>
                </tr>
                <tr className="odd:swise-bg-white even:swise-bg-gray-50 swise-border-b">
                    <td
                        className="swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900 swise-whitespace-nowrap">
                        {__( 'Spreadsheet & Worksheet', 'sheet-wise' )}
                    </td>
                    <td className="swise-px-6 swise-py-4">
                        <select id="countries"
                                className="swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full">
                            <option selected>{__( 'Select...', 'sheet-wise' )}</option>
                            {sheets.map( sheet => <option  key={sheet.id} value={sheet.id}>{ sheet.name }</option> )}
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}