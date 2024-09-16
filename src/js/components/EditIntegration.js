import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import apiFetch from '@wordpress/api-fetch';
import {addQueryArgs} from '@wordpress/url';
import Navigation from './Navigation';
import {__} from '@wordpress/i18n';
import dashboard from '../routes/dashboard';

export default function EditIntegration() {
    const {id} = useParams();
    const dataSource = swiseDashboard.dataSources;
    const [integration, setIntegration] = useState( [] );
    const [sheets, setSheets] = useState( [] );
    const [rows, setRows] = useState( [] );
    const [currentSheet, setCurrentSheet] = useState( 'select' );
    const [currentSource, setCurrentSource] = useState( 'select' );
    const [eventCodeValues, setEventCodeValues] = useState( [] );
    const [dataSourceValues, setDataSourceValues] = useState( [] );
    const [rowLoading, setRowLoading] = useState( false );
    const [errors, setErrors] = useState( {} );

    const navigate = useNavigate();

    useEffect( () => {
        fetchIntegration();
    }, [] );

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
            } );
    };

    const fetchIntegration = async () => {
        let path = '/wp-json/swise/v1/integrations/' + id;

        apiFetch( {
            path: addQueryArgs( path ),
            method: 'GET',
            headers: {
                'X-WP-Nonce': swiseDashboard.nonce,
            },
        } )
            .then( ( response ) => {
                if (response.success) {
                    setIntegration( response.data );
                    populateRows( response.data );
                }
            } )
            .catch( ( error ) => {
                console.log( error );
            } )
            .finally( () => {
                // setLoading( false );
            } );
    }

    const populateRows = ( integration ) => {
        const content = JSON.parse( integration.post_content );

        if (!content) {
            return {};
        }

        if (content.rows) {
            setRows( content.rows );
        }

        if (content.data_sources) {
            setDataSourceValues( content.data_sources );
        }

        if (content.event_codes) {
            setEventCodeValues( content.event_codes );
        }

        if (content.sheet) {
            setCurrentSheet( content.sheet );
        }

        if (content.source) {
            setCurrentSource( content.source );
        }
    }

    const contentRef = useRef( null );
    const targetRef = useRef( null );
    const [targetHeight, setTargetHeight] = useState( 0 );

    const classes = ( dynamic, classes = '' ) => {
        return Object.entries( dynamic )
            .filter( ( entry ) => entry[1] )
            .map( ( entry ) => entry[0] )
            .join( ' ' )
            .concat( ' ' )
            .concat( classes );
    }

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

    const updateIntegration = () => {
        const data = {
            title: integration.post_title,
            source: currentSource,
            sheet: currentSheet,
            rows: rows,
            event_codes: eventCodeValues,
            data_sources: dataSourceValues,
            id: integration.ID
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

        const path = '/wp-json/swise/v1/integrations/' + integration.ID;

        apiFetch( {
            path: addQueryArgs( path ),
            method: 'PATCH',
            headers: {
                'X-WP-Nonce': swiseDashboard.nonce,
            },
            body: JSON.stringify( data ),
        } )
            .then( ( response ) => {
                if (response.code === 200) {
                    navigate( dashboard.home );
                }
            } )
            .catch( ( error ) => {
                console.log( error );
            } )
            .finally( () => {
            } );
    }

    const fetchRows = async ( sheet ) => {
        if (sheet === 'select') {
            return;
        }

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

    return (
        <>
            <Navigation/>
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
                                id="swise-integration-title"
                                value={integration.post_title}
                                onChange={( e ) => setIntegration( {...integration, post_title: e.target.value} )}
                                className={classes( {
                                        '!swise-input-error !swise-text-red-900': errors.title,
                                        '!swise-border-gray-300 swise-text-gray-900': !errors.title
                                    },
                                    'swise-font-medium swise-w-full swise-max-w-full' )}
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
                                value={currentSource}
                                onChange={e => setCurrentSource( e.target.value )}
                                className={
                                    classes( {
                                            '!swise-select-error !swise-text-red-900': errors.source,
                                            '!swise-border-gray-300 swise-text-gray-900': !errors.source
                                        },
                                        'swise-bg-gray-50 swise-border swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full' )}>
                                <option value="select">{__( 'Select...', 'sheet-wise' )}</option>
                                {
                                    Object.keys( dataSource ).map( ( key ) => {
                                        return <option key={key} value={key}>{dataSource[key]}</option>
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
                                onChange={e => {
                                    setCurrentSheet( e.target.value );
                                    fetchRows( e.target.value );
                                }}
                                className={
                                    classes( {
                                            '!swise-select-error !swise-text-red-900': errors.sheet,
                                            '!swise-border-gray-300 swise-text-gray-900': !errors.sheet
                                        },
                                        'swise-bg-gray-50 swise-border swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full' )}>
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
                                    {__( 'Data Source Event Name', 'sheet-wise' )}
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
                                            {
                                                currentSource !== 'select' && swiseDashboard.dataEvents[currentSource] &&
                                                Object.keys( swiseDashboard.dataEvents[currentSource] ).map( ( key ) => {
                                                    return <option key={key}
                                                                   value={key}>{swiseDashboard.dataEvents[currentSource][key].label}</option>
                                                } )
                                            }
                                        </select>
                                    </td>
                                </tr>
                            ) )}
                            </tbody>
                        </table>
                        <button
                            onClick={updateIntegration}
                            className="swise-mt-4 swise-rounded-md swise-bg-indigo-600 swise-px-3 swise-py-2 swise-text-sm swise-font-semibold swise-text-white swise-shadow-sm hover:swise-bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {__( 'Update', 'sheet-wise' )}
                        </button>
                    </>
                }
                <RowLoading/>
            </div>
        </>
    );
}