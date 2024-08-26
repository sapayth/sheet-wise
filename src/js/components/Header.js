import React from 'react';

export default function Header( {version} ) {

    return (
        <div className="swise-nav-toolbar swise-bg-slate-700 swise-text-slate-100 swise-flex swise--ml-[20px]">
            <div className="swise-m-6">
                <h2 className="swise-text-2xl swise-leading-none swise-m-0 swise-text-slate-100">
                    Sheet Wise
                    <span
                        className="swise-ml-4 swise-bg-gray-100 swise-text-slate-700 swise-text-xs swise-font-medium me-2 swise-px-2.5 swise-py-0.5 swise-rounded-full">{version}</span>
                </h2>
            </div>
        </div>
    );
}
