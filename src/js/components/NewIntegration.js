import React, {useEffect, useState, useRef} from 'react';
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';

import {__} from '@wordpress/i18n';

export default function NewIntegration( {setActiveComponent} ) {
    const dataSource = {
        'wp-new-user': {
            id: 'wp-new-user',
            name: __( 'Wordpress New User', 'sheet-wise' ),
            options: [{
                id: 'user-id', name: __( 'User ID', 'sheet-wise' ),
            }, {
                id: 'user-name', name: __( 'User Name', 'sheet-wise' ),
            }, {
                id: 'user-first-name', name: __( 'User First Name', 'sheet-wise' ),
            }, {
                id: 'user-last-name', name: __( 'User Last Name', 'sheet-wise' ),
            }, {
                id: 'user-email', name: __( 'User Email', 'sheet-wise' ),
            }, {
                id: 'user-role', name: __( 'User Role', 'sheet-wise' ),
            }]
        },
        'wp-user-profile-update': {
            id: 'wp-user-profile-update',
            name: __( 'Wordpress User Profile Update', 'sheet-wise' )
        },
        'wp-delete-user': {
            id: 'wp-delete-user',
            name: __( 'Wordpress Delete User', 'sheet-wise' )
        },
        'wp-user-login': {
            id: 'wp-user-login',
            name: __( 'Wordpress User Login', 'sheet-wise' )
        },
        'wp-user-logout': {
            id: 'wp-user-logout',
            name: __( 'Wordpress User Logout', 'sheet-wise' )
        },
        'wp-new-post': {
            id: 'wp-new-post',
            name: __( 'Wordpress New Post', 'sheet-wise' )
        },
        'wp-edit-post': {
            id: 'wp-edit-post',
            name: __( 'Wordpress Edit Post', 'sheet-wise' )
        },
        'wp-delete-post': {
            id: 'wp-delete-post',
            name: __( 'Wordpress Delete Post', 'sheet-wise' )
        },
        'wp-page': {
            id: 'wp-page',
            name: __( 'Wordpress Page', 'sheet-wise' )
        },
        'wp-comment': {
            id: 'wp-comment',
            name: __( 'Wordpress Comment', 'sheet-wise' )
        },
        'wp-edit-comment': {
            id: 'wp-edit-comment',
            name: __( 'Wordpress Edit Comment', 'sheet-wise' )
        }
    };
    const [sheets, setSheets] = useState( [] );
    const [rows, setRows] = useState( [] );
    const [currentSheet, setCurrentSheet] = useState( 'select' );
    const [currentSource, setCurrentSource] = useState( 'select' );
    const [currentOption, setCurrentOption] = useState( 'select' );
    const [eventCode, setEventCode] = useState( '' );
    const [eventCodeValues, setEventCodeValues] = useState( [] );
    const [dataSourceValues, setDataSourceValues] = useState( [] );
    const [loading, setLoading] = useState( true );
    const [rowLoading, setRowLoading] = useState( false );
    const [errors, setErrors] = useState( {} );

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
                } );
        };

        fetchSheets();

    }, [] );

    useEffect( () => {
        const fetchRows = async () => {
            setRowLoading( true );
            let path = '/wp-json/swise/v1/sheets/' + currentSheet + '/rows';

            apiFetch( {
                path: addQueryArgs( path ),
                method: 'GET',
                headers: {
                    'X-WP-Nonce': swiseDashboard.nonce,
                },
            } )
                .then( ( response ) => {
                    if (response.success) {
                        setRows( response.rows );
                    }
                } )
                .catch( ( error ) => {
                    console.log( error );
                } )
                .finally( () => {
                    setRowLoading( false );
                } );
        };

        if (currentSheet !== 'select') {
            fetchRows();
        }

    }, [currentSheet] );

    const contentRef = useRef( null );
    const targetRef = useRef( null );
    const [targetHeight, setTargetHeight] = useState( 0 );

    useEffect( () => {
        const handleResize = () => {
            const contentHeight = contentRef.current.offsetHeight + 300;
            const viewportHeight = window.innerHeight;
            setTargetHeight( viewportHeight - contentHeight );
        };

        handleResize();
        window.addEventListener( 'resize', handleResize );

        return () => {
            window.removeEventListener( 'resize', handleResize );
        };
    }, [] );

    const sourceOptions = Object.keys( dataSource ).map( function ( key ) {
        return <option value={key}>{dataSource[key].name}</option>
    } );

    const RowLoading = () => {
        if (rowLoading) {
            return (
                <div
                    ref={targetRef} style={{height: `${targetHeight}px`}}
                    className="swise-flex swise-items-center swise-justify-center">
                    <span className="swise-loading swise-loading-dots swise-loading-lg"></span>
                </div>
            )
        }
        return null;
    }

    const handleDataSourceChange = ( index, value ) => {
        if (value === 'select') {
            return;
        }

        const newDataSourceValues = [...dataSourceValues];
        const newEventCodeValues = [...eventCodeValues];

        newDataSourceValues[index] = value;
        newEventCodeValues[index] = eventCodeValues[index] !== undefined ? eventCodeValues[index] + ' [[' + value + ']]' : '[[' + value + ']]';

        setDataSourceValues( newDataSourceValues );
        setEventCodeValues( newEventCodeValues );
    };

    const saveIntegration = () => {
        const data = {
            title: document.getElementById( 'swise-integration-title' ).value,
            source: currentSource,
            sheet: currentSheet,
            rows: rows,
            event_codes: eventCodeValues,
            data_sources: dataSourceValues
        };

        const errors = {};

        if (data.title === '') {
            errors.title = __( 'Please enter a title for the integration.', 'sheet-wise' );
        }

        if (data.source === 'select') {
            errors.source = __( 'Please select a data source.', 'sheet-wise' );
        }

        if (data.sheet === 'select') {
            errors.sheet = __( 'Please select a spreadsheet.', 'sheet-wise' );
        }

        setErrors( errors );

        if (Object.keys( errors ).length > 0) {
            return;
        }

        const path = '/wp-json/swise/v1/integrations';

        apiFetch( {
            path: addQueryArgs( path ),
            method: 'POST',
            headers: {
                'X-WP-Nonce': swiseDashboard.nonce,
            },
            body: JSON.stringify( data ),
        } )
            .then( ( response ) => {
                if (response.code === 200) {
                    setActiveComponent( 'ListTable' );
                }
            } )
            .catch( ( error ) => {
                console.log( error );
            } )
            .finally( () => {} );
    }

    const classes = ( dynamic, classes = '' ) => {
        return Object.entries( dynamic )
            .filter( ( entry ) => entry[1] )
            .map( ( entry ) => entry[0] )
            .join( ' ' )
            .concat( ' ' )
            .concat( classes );
    }

    return (
        <div ref={contentRef}>
            <table
                className="swise-shadow-md sm:swise-rounded-lg swise-w-full swise-mt-8 swise-text-sm swise-text-left swise-text-gray-500">
                <tbody>
                <tr className="odd:swise-bg-white even:swise-bg-gray-50 swise-border-b">
                    <td
                        className="swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900">
                        {__( 'Integration Title', 'sheet-wise' )}
                    </td>
                    <td className="swise-px-6 swise-py-4">
                        <input
                            id='swise-integration-title'
                            className={classes({
                                '!swise-input-error !swise-text-red-900': errors.title,
                                '!swise-border-gray-300 swise-text-gray-900': !errors.title
                            },
                                'swise-font-medium swise-w-full swise-max-w-full')}
                            type="text"/>
                        {errors.title &&
                            <p
                                className="swise-text-red-900 swise-text-sm swise-mt-1"
                            >{errors.title}</p>
                        }
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
                            onChange={e => setCurrentSource( e.target.value )}
                            className={
                                classes({
                                    '!swise-select-error !swise-text-red-900': errors.source,
                                    '!swise-border-gray-300 swise-text-gray-900': !errors.source
                                },
                        'swise-bg-gray-50 swise-border swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full')}>
                            <option value="select">{__( 'Select...', 'sheet-wise' )}</option>
                            {
                                Object.keys( dataSource ).map( ( key ) => {
                                    return <option key={key} value={key}>{dataSource[key].name}</option>
                                } )
                            }
                        </select>
                        {errors.source &&
                            <p
                                className="swise-text-red-900 swise-text-sm swise-mt-1"
                            >{errors.source}</p>
                        }
                    </td>
                </tr>
                <tr className="odd:swise-bg-white even:swise-bg-gray-50 swise-border-b">
                    <td
                        className="swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900 swise-whitespace-nowrap">
                        {__( 'Spreadsheet & Worksheet', 'sheet-wise' )}
                    </td>
                    <td className="swise-px-6 swise-py-4">
                        <select
                            id="spreadsheet"
                            value={currentSheet}
                            onChange={e => setCurrentSheet( e.target.value )}
                            className={
                                classes({
                                        '!swise-select-error !swise-text-red-900': errors.sheet,
                                        '!swise-border-gray-300 swise-text-gray-900': !errors.sheet
                                    },
                                    'swise-bg-gray-50 swise-border swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full')}>
                            <option value="select">{__( 'Select...', 'sheet-wise' )}</option>
                            {sheets.map( sheet => <option key={sheet.id} value={sheet.id}>{sheet.name}</option> )}
                        </select>
                        {errors.sheet &&
                            <p
                                className="swise-text-red-900 swise-text-sm swise-mt-1"
                            >{errors.sheet}</p>
                        }
                    </td>
                </tr>
                </tbody>
            </table>
            {( rows.length > 0 && !rowLoading ) &&
                <>
                    <table
                        className="swise-w-full swise-mt-12 swise-text-sm swise-text-left swise-text-gray-500">
                        <thead>
                        <tr className="swise-bg-gray-50">
                            <th className="swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900">
                                {__( 'Spreadsheet Column Title', 'sheet-wise' )}
                            </th>
                            <th className="swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900">
                                {__( 'Event Code', 'sheet-wise' )}
                            </th>
                            <th className="swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900">
                                {__( 'Data Source', 'sheet-wise' )}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map( ( row, index ) => (
                            <tr key={index} className="odd:swise-bg-white even:swise-bg-gray-50">
                                <td className="swise-px-6 swise-py-4 swise-text-gray-900">
                                    {row}
                                </td>
                                <td className="swise-px-6 swise-py-4 swise-text-gray-900">
                                    <input
                                        id="eventCode"
                                        key={index}
                                        type="text"
                                        placeholder={__( 'Event Code Here', 'sheet-wise' )}
                                        value={eventCodeValues[index] || ''}
                                        onChange={( e ) => {
                                            const newEventCodeValues = [...eventCodeValues];
                                            newEventCodeValues[index] = e.target.value;
                                            setEventCodeValues( newEventCodeValues );
                                        }}
                                        className="swise-input swise-input-bordered swise-input-sm swise-w-full swise-max-w-xs"/>
                                </td>
                                <td className="swise-px-6 swise-py-4 swise-text-gray-900">
                                    <select
                                        id="dataSource"
                                        key={index}
                                        value={dataSourceValues[index] || ''}
                                        onChange={( e ) => handleDataSourceChange( index, e.target.value )}
                                        className="swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full">
                                        <option value="select">{__( 'Select...', 'sheet-wise' )}</option>
                                        {currentSource !== 'select' && dataSource[currentSource].options.map( source =>
                                            <option key={source.id} value={source.id}>{source.name}</option> )}
                                    </select>
                                </td>
                            </tr>
                        ) )}
                        </tbody>
                    </table>
                    <button
                        onClick={saveIntegration}
                        className="swise-mt-4 swise-rounded-md swise-bg-indigo-600 swise-px-3 swise-py-2 swise-text-sm swise-font-semibold swise-text-white swise-shadow-sm hover:swise-bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {__( 'Save', 'sheet-wise' )}
                    </button>
                </>
            }
            <RowLoading/>
        </div>
    )
}