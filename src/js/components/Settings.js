import React, { Fragment, useState, useEffect } from 'react';
import {
    Spinner, ToggleControl
} from '@wordpress/components';
import '@wordpress/components/build-style/style.css';
import { __ } from '@wordpress/i18n';
import Header from './Header';
import {HashRouter, Route, Routes} from 'react-router-dom';
import settingsRoute from '../routes/settings';
import HowTo from './HowTo';

export default function Settings() {
    const [isLoading, setIsLoading] = useState( false );
    const [settings, setSettings] = useState( {} );
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
                    setSettings( data.settings );
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

        /*if (!isJsonString( credentialJson )) {
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
        }*/

        await fetch( swiseSettings.restURL + '/settings', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': swiseSettings.nonce,
            },
            body: JSON.stringify( {
                settings: settings,
            } ),
        } )
            .then( ( response ) => response.json() )
            .then( ( data ) => {
                if (data.code === 200) {
                    // setCredentialJson( data.credential );
                }
            } )
            .catch( ( err ) => {
                console.log( err.message );
            } )
            .finally( () => {
                setIsLoading( false );
            });
    }

    const renderField = (sectionKey, fieldKey, fieldConfig) => {

        const section = settings[sectionKey];

        if (!section) {
            return;
        }

        const [value, setValue] = useState( section[fieldKey] );

        switch (fieldConfig.field_type) {
            case 'textarea':
                return (
                    <div key={fieldKey} className="swise-space-y-2">
                        <label
                            htmlFor={fieldKey}
                            className="swise-block swise-text-sm swise-font-medium swise-text-gray-700"
                        >
                            {fieldConfig.label}
                        </label>
                        <textarea
                            id={fieldKey}
                            placeholder={`Enter ${fieldConfig.label}`}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                settings[sectionKey][fieldKey] = e.target.value;
                            }}
                            className="swise-w-full min-h-32 swise-p-2 swise-border swise-border-gray-300 swise-rounded-md focus:swise-ring-2 focus:swise-ring-blue-500 focus:swise-border-blue-500"
                        />
                        <p
                            className="swise-text-sm swise-text-gray-500"
                            dangerouslySetInnerHTML={{__html: fieldConfig.description}}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const Field = ( {field, sectionKey} ) => {
        const fieldKey = field.id;
        const fieldType = field.field_type;
        const fieldLabel = field.label;
        const placeholder = field.placeholder;

        const [value, setValue] = useState( settings[sectionKey][fieldKey] );

        switch (fieldType) {
            case 'textarea':
                return (
                    <textarea
                        id={fieldKey}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            settings[sectionKey][fieldKey] = e.target.value;
                        }}
                        className="swise-w-full min-h-32 swise-p-2 swise-border swise-border-gray-300 swise-rounded-md focus:swise-ring-2 focus:swise-ring-blue-500 focus:swise-border-blue-500"
                    />
                );

            case 'toggle':
                return (
                    <ToggleControl
                        label={fieldLabel}
                        checked={value}
                        onChange={(newVal) => {
                            setValue(newVal);
                            settings[sectionKey][fieldKey] = newVal;
                        }}
                    />
                );

            default:
                return (
                    <input
                        type="text"
                        id={fieldKey}
                        placeholder={`Enter ${fieldLabel}`}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            settings[sectionKey][fieldKey] = e.target.value;
                        }}
                        className="swise-w-full swise-p-2 swise-border swise-border-gray-300 swise-rounded-md focus:swise-ring-2 focus:swise-ring-blue-500 focus:swise-border-blue-500"
                    />
                );
        }
    };

    const TabContentForm = ({ tabKey, title, description, fields }) => {
        if (!settings[tabKey]) {
            return (
                <></>
            );
        }

        return (
            <div className="swise-bg-white swise-p-6 swise-rounded-lg swise-shadow">
                <div className="swise-mb-8">
                    <h2 className="swise-text-xl swise-font-semibold swise-m-0">{title}</h2>
                    <p className="swise-text-sm swise-text-gray-500 swise-my-4">{description}</p>
                </div>
                {fields.map( ( field, index ) => (
                    <div key={index} className="swise-mb-6">
                        <label
                            className="swise-block swise-text-sm swise-font-medium swise-text-gray-700"
                            htmlFor={field.id}
                        >
                            {field.label}
                        </label>
                        <Field
                            key={field.id}
                            field={field}
                            sectionKey={tabKey} />
                        {/*{field.type === "textarea" ? (
                            <textarea
                                id={field.id}
                                placeholder={field.placeholder}
                                value={settings[tabKey][field.id]}
                                className="swise-mt-2 swise-w-full swise-border swise-border-gray-300 swise-rounded-md swise-p-3 swise-text-gray-700 focus:swise-outline-none focus:swise-border-blue-500"
                            />
                        ) : (
                            <input
                                type={field.type}
                                id={field.id}
                                placeholder={field.placeholder}
                                value={settings[tabKey][field.id]}
                                className="swise-mt-2 swise-w-full swise-border swise-border-gray-300 swise-rounded-md swise-p-3 swise-text-gray-700 focus:swise-outline-none focus:swise-border-blue-500"
                            />
                        )}*/}
                        {field.description && (
                            <p className="swise-mt-1 swise-text-sm swise-text-gray-500">
                                {field.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const Settings = () => {
        if (!settings.google_sheet) {
            return;
        }

        const tabsData = swiseSettings.settings;

        const [activeTab, setActiveTab] = useState(Object.keys(tabsData)[0]);

        return (
            <div>
                <div className="swise-flex swise-border-b swise-border-gray-300 swise-mb-4">
                    {Object.keys(tabsData).map((tabKey) => (
                        <button
                            key={tabKey}
                            onClick={() => setActiveTab(tabKey)}
                            className={`swise-p-4 swise-text-base ${
                                activeTab === tabKey
                                    ? "swise-border-b-2 swise-border-black swise-text-black"
                                    : "swise-text-gray-500"
                            }`}
                        >
                            {tabsData[tabKey].label}
                        </button>
                    ))}
                </div>
                {Object.keys(tabsData).map(
                    (tabKey) =>
                        activeTab === tabKey && (
                            <TabContentForm
                                key={tabKey}
                                tabKey={tabKey}
                                title={tabsData[tabKey].label}
                                description={tabsData[tabKey].description}
                                fields={Object.entries(tabsData[activeTab].fields).map(
                                    ([fieldKey, fieldData]) => ({
                                        id: fieldKey,
                                        ...fieldData,
                                    })
                                )}
                            />
                        )
                )}
                <div className="swise-mt-4">
                    <button
                        onClick={saveSettings}
                        className="swise-py-2 swise-px-4 swise-bg-blue-500 swise-text-white swise-rounded-md"
                    >
                        {__( 'Save Settings' )}
                    </button>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="swise-flex swise-justify-center swise-items-center swise-h-screen">
                <Spinner/>
            </div>
        );
    }

    return (
        <>
            <Header version={swiseSettings.version}/>
            <HashRouter>
                <Routes>
                    <Route path={settingsRoute.home} element={<Settings />}/>
                    <Route path={settingsRoute.docs.howto} element={<HowTo/>}/>
                </Routes>
            </HashRouter>
        </>
    )
}