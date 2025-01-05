import React from 'react';
import {__} from '@wordpress/i18n';

export default function Header( {version} ) {

    return (
        <div className="swise-nav-toolbar swise-bg-slate-700 swise-text-slate-100 swise-flex swise-justify-between swise--ml-[20px]">
            <div className="swise-m-6">
                <h2 className="swise-text-2xl swise-leading-none swise-m-0 swise-text-slate-100">
                    Sheet Wise
                    <span
                        className="swise-ml-4 swise-bg-gray-100 swise-text-slate-700 swise-text-xs swise-font-medium me-2 swise-px-2.5 swise-py-0.5 swise-rounded-full">{version}</span>
                </h2>
            </div>
            <div className="swise-m-6">
                <span className="swise-font-medium swise-text-lg">{ __( 'Got an feature idea? ', 'sheet-wise' ) }</span>
                <a href="https://sheetwise.canny.io/feature-requests" target="_blank"
                   className="swise-underline hover:swise-no-underline swise-font-bold swise-text-lg swise-text-indigo-400 hover:swise-text-indigo-300 focus:swise-text-indigo-300">
                    { __( 'Share with us!', 'sheet-wise' ) }
                </a>
            </div>
        </div>
    );
}
