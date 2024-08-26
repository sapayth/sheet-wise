import React, { Fragment, useState, useEffect } from 'react';
import {
    Spinner,
    Card,
    CardBody,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Header from './Header';

export default function Settings() {
    const [isLoading, setIsLoading] = useState( false );
    const [credentialJson, setCredentialJson] = useState( '' );
    const [errors, setErrors] = useState( {} );

    useEffect(() => {
        setIsLoading( true );
        fetch( swiseSettings.restURL + '/settings', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': swiseSettings.nonce,
            },
        } )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setCredentialJson(data.credential);
                }
            })
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const isJsonString = ( str ) => {
        try {
            JSON.parse( str );
        } catch (e) {
            return false;
        }
        return true;
    }

    const saveSettings = async () => {
        setErrors( {} );

        setIsLoading( true );

        if (!isJsonString( credentialJson )) {
            setErrors(
                {
                    credential: {
                        status: true,
                        message: 'Invalid credential JSON',
                    }
                }
            );

            return;
        }

        const cred = JSON.parse( credentialJson.trim() );

        if (!cred
            || !cred.type
            || !cred.project_id
            || !cred.private_key_id
            || !cred.private_key
            || !cred.client_email
            || !cred.client_id
            || !cred.auth_uri
            || !cred.token_uri
            || !cred.auth_provider_x509_cert_url
            || !cred.client_x509_cert_url) {

            setErrors(
                {
                    credential: {
                        status: true,
                        message: 'One or more fields are missing in credential JSON',
                    }
                }
            );

            return;
        }

        await fetch( swiseSettings.restURL + '/settings', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': swiseSettings.nonce,
            },
            body: JSON.stringify( {
                credentialJson: credentialJson,
            } ),
        } )
            .then( ( response ) => response.json() )
            .then( ( data ) => {
                if (data.code === 200) {
                    setCredentialJson( data.credential );
                }
            } )
            .catch( ( err ) => {
                console.log( err.message );
            } )
            .finally( () => {
                setIsLoading( false );
            });
    }

    if (isLoading) {
        return (
            <div className="swise-flex swise-justify-center swise-items-center swise-h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <Header version={swiseSettings.version} />
            <div className="swise-border-b swise-border-gray-200 dark:swise-border-gray-700">
                <ul className="swise-flex swise-flex-wrap swise--mb-px swise-text-sm swise-font-medium swise-text-gray-500 dark:swise-text-gray-400">
                    <li className="me-2">
                        <a href="#"
                           className="swise-border-slate-600 swise-inline-flex swise-p-4 swise-border-b-2 swise-rounded-t-lg hover:swise-text-gray-600 hover:swise-border-gray-300 dark:hover:swise-text-gray-300 focus:swise-shadow-none">
                            <svg width="15" height="20" viewBox="0 0 74 100" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_1:52" maskUnits="userSpaceOnUse" x="1" y="1" width="71"
                                      height="98">
                                    <path
                                        d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z"
                                        fill="white"/>
                                </mask>
                                <g mask="url(#mask0_1:52)">
                                    <path
                                        d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L56.4365 16.8843L45.398 1.43036Z"
                                        fill="#0F9D58"/>
                                </g>
                                <mask id="mask1_1:52" maskUnits="userSpaceOnUse" x="1" y="1" width="71"
                                      height="98">
                                    <path
                                        d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z"
                                        fill="white"/>
                                </mask>
                                <g mask="url(#mask1_1:52)">
                                    <path
                                        d="M18.9054 48.8962V80.908H54.2288V48.8962H18.9054ZM34.3594 76.4926H23.3209V70.9733H34.3594V76.4926ZM34.3594 67.6617H23.3209V62.1424H34.3594V67.6617ZM34.3594 58.8309H23.3209V53.3116H34.3594V58.8309ZM49.8134 76.4926H38.7748V70.9733H49.8134V76.4926ZM49.8134 67.6617H38.7748V62.1424H49.8134V67.6617ZM49.8134 58.8309H38.7748V53.3116H49.8134V58.8309Z"
                                        fill="#F1F1F1"/>
                                </g>
                                <mask id="mask2_1:52" maskUnits="userSpaceOnUse" x="1" y="1" width="71"
                                      height="98">
                                    <path
                                        d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z"
                                        fill="white"/>
                                </mask>
                                <g mask="url(#mask2_1:52)">
                                    <path d="M47.3352 25.9856L71.8905 50.5354V27.9229L47.3352 25.9856Z"
                                          fill="url(#paint0_linear_1:52)"/>
                                </g>
                                <mask id="mask3_1:52" maskUnits="userSpaceOnUse" x="1" y="1" width="71"
                                      height="98">
                                    <path
                                        d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z"
                                        fill="white"/>
                                </mask>
                                <g mask="url(#mask3_1:52)">
                                    <path
                                        d="M45.398 1.43036V21.2998C45.398 24.959 48.3618 27.9229 52.0211 27.9229H71.8905L45.398 1.43036Z"
                                        fill="#87CEAC"/>
                                </g>
                                <mask id="mask4_1:52" maskUnits="userSpaceOnUse" x="1" y="1" width="71"
                                      height="98">
                                    <path
                                        d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z"
                                        fill="white"/>
                                </mask>
                                <g mask="url(#mask4_1:52)">
                                    <path
                                        d="M7.86688 1.43036C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V8.60542C1.24374 4.9627 4.22415 1.98229 7.86688 1.98229H45.398V1.43036H7.86688Z"
                                        fill="white" fillOpacity="0.2"/>
                                </g>
                                <mask id="mask5_1:52" maskUnits="userSpaceOnUse" x="1" y="1" width="71"
                                      height="98">
                                    <path
                                        d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z"
                                        fill="white"/>
                                </mask>
                                <g mask="url(#mask5_1:52)">
                                    <path
                                        d="M65.2674 98.0177H7.86688C4.22415 98.0177 1.24374 95.0373 1.24374 91.3946V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V91.3946C71.8905 95.0373 68.9101 98.0177 65.2674 98.0177Z"
                                        fill="#263238" fillOpacity="0.2"/>
                                </g>
                                <mask id="mask6_1:52" maskUnits="userSpaceOnUse" x="1" y="1" width="71"
                                      height="98">
                                    <path
                                        d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z"
                                        fill="white"/>
                                </mask>
                                <g mask="url(#mask6_1:52)">
                                    <path
                                        d="M52.0211 27.9229C48.3618 27.9229 45.398 24.959 45.398 21.2998V21.8517C45.398 25.511 48.3618 28.4748 52.0211 28.4748H71.8905V27.9229H52.0211Z"
                                        fill="#263238" fillOpacity="0.1"/>
                                </g>
                                <path
                                    d="M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z"
                                    fill="url(#paint1_radial_1:52)"/>
                                <defs>
                                    <linearGradient id="paint0_linear_1:52" x1="59.6142" y1="28.0935"
                                                    x2="59.6142" y2="50.5388" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#263238" stopOpacity="0.2"/>
                                        <stop offset="1" stopColor="#263238" stopOpacity="0.02"/>
                                    </linearGradient>
                                    <radialGradient id="paint1_radial_1:52" cx="0" cy="0" r="1"
                                                    gradientUnits="userSpaceOnUse"
                                                    gradientTransform="translate(3.48187 3.36121) scale(113.917)">
                                        <stop stopColor="white" stopOpacity="0.1"/>
                                        <stop offset="1" stopColor="white" stopOpacity="0"/>
                                    </radialGradient>
                                </defs>
                            </svg>
                            &nbsp;&nbsp; { __( 'Google Sheet', 'swise' ) }
                        </a>
                    </li>
                </ul>
            </div>
            <Card>
                <CardBody>
                    <div>
                        <label htmlFor="swise-credential"
                               className="swise-block swise-mb-2 swise-text-sm swise-font-medium swise-text-gray-900 dark:swise-text-white">
                            {__( 'Service Account Credential JSON', 'swise' )}
                        </label>
                        <textarea
                            id="swise-credential"
                            onChange={( e ) => {
                                setCredentialJson( e.target.value );
                            }}
                            rows="10"
                            value={credentialJson}
                            className="swise-block swise-p-2.5 swise-w-full swise-text-sm swise-text-gray-900 swise-bg-gray-50 swise-rounded-lg swise-border swise-border-gray-300 focus:swise-ring-slate-500 focus:swise-border-slate-500 dark:swise-bg-gray-700 dark:swise-border-gray-600 dark:swise-placeholder-gray-400 dark:swise-text-white dark:focus:swise-ring-slate-500 dark:focus:swise-border-slate-500"></textarea>
                        <div className="swise-mt-1 swise-text-sm">
                            <p id="helper-text-explanation"
                               className="swise-mt-2 swise-text-gray-500 dark:swise-text-gray-400">
                                {__( 'Copy the full JSON file Credentials and paste it here. ', 'swise' )}
                                <a href="#"
                                className="swise-font-medium swise-text-blue-600 hover:swise-underline dark:swise-text-blue-500 focus:swise-shadow-none">{__( 'How to?', 'swise' )}</a>
                            </p>
                            {errors.credential &&
                            <p className="swise-mt-2 swise-text-sm swise-text-red-600 dark:swise-text-red-500">
                                {errors.credential.message}
                            </p>
                            }
                        </div>
                        <button
                            type="button"
                            onClick={saveSettings}
                            className="swise-mt-8 swise-text-white swise-bg-slate-700 hover:swise-bg-slate-800 swise-font-medium swise-rounded-lg swise-text-sm swise-px-5 swise-py-2.5 me-2 swise-mb-2 dark:swise-bg-slate-600 dark:hover:swise-bg-slate-700">{__( 'Save', 'swise' ) }
                        </button>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}