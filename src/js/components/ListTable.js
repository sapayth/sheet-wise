import React, {useEffect, useState} from 'react';
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';
import {__} from '@wordpress/i18n';
import Navigation from './Navigation';

export default function ListTable() {
    const [sheets, setSheets] = useState( [] );
    const [loading, setLoading] = useState( true );

    const googleSheetLink = 'https://docs.google.com/spreadsheets/d/';

    useEffect( () => {
        fetchSheets();
    }, [] );

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
                setLoading( false );
            } );
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
                                        {__( 'Link', 'sheet-wise' )}
                                    </th>
                                    <th scope="col"
                                        className="swise-relative swise-py-3.5 swise-pl-3 swise-pr-4 sm:swise-pr-6">
                                        <span className="swise-sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="swise-divide-y swise-divide-gray-200 swise-bg-white">
                                {sheets.map( sheet => {
                                    return (
                                        <tr key={sheet.id}>
                                            <td className="swise-whitespace-nowrap swise-py-4 swise-pl-4 swise-pr-3 swise-text-sm swise-font-medium swise-text-gray-900 sm:swise-pl-6">{sheet.name}</td>
                                            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">{sheet.id}</td>
                                            <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">
                                                <a href={googleSheetLink + sheet.id} target="_blank"><span
                                                    className="dashicons dashicons-admin-links"></span></a></td>
                                            <td className="swise-relative swise-whitespace-nowrap swise-py-4 swise-pl-3 swise-pr-4 swise-text-right swise-text-sm swise-font-medium sm:swise-pr-6">
                                                <a href="#"
                                                   className="swise-text-indigo-600 hover:swise-text-indigo-900">Edit<span
                                                    className="swise-sr-only">, {sheet.name}</span></a>
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