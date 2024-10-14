import {__} from '@wordpress/i18n';
import React, {useState} from 'react';

export default function IntegrationRow({integration, handleDelete, handleStatusChange}) {
    const toggleButtonClasses = {
        draft: 'swise-bg-gray-200',
        publish: 'swise-bg-indigo-600',
    };

    const toggleSpanClasses = {
        draft: 'swise-translate-x-0',
        publish: 'swise-translate-x-5',
    };

    const [toggleButtonClass, setToggleButtonClass] = useState( toggleButtonClasses[integration.post_status] );
    const [toggleSpanClass, setToggleSpanClass] = useState( toggleSpanClasses[integration.post_status] );
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
                <button
                    onClick={(event) => {
                        handleStatusChange( event );
                        // integration.post_status = integration.post_status === 'publish' ? 'draft' : 'publish';
                        setToggleButtonClass( toggleButtonClasses[integration.post_status] );
                        setToggleSpanClass( toggleSpanClasses[integration.post_status] );
                    }}
                    data-id={integration.id}
                    data-post-status={integration.post_status}
                    type="button"
                    className={`swise-relative swise-inline-flex swise-h-6 swise-w-11 swise-flex-shrink-0 swise-cursor-pointer swise-rounded-full swise-border-2 swise-border-transparent swise-transition-colors swise-duration-200 swise-ease-in-out ${toggleButtonClass}`}
                    role="switch"
                    aria-checked="false">
                    <span
                        aria-hidden="true"
                        className={`swise-pointer-events-none swise-inline-block swise-h-5 swise-w-5 swise-transform swise-rounded-full swise-bg-white swise-shadow swise-ring-0 swise-transition swise-duration-200 swise-ease-in-out ${toggleSpanClass}`}></span>
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
}