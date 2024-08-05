import React, {Fragment, useState} from 'react';

import Navigation from './Navigation';
import { __ } from '@wordpress/i18n';
import DynamicComponent from './DynamicComponent';

export default function Settings() {
    const [activeComponent, setActiveComponent] = useState('ListTable');

    return (
        <>
            <Navigation version={swiseDashboard.version}/>
            <div className="wrap">
                <h1 className="wp-heading-inline">
                    {activeComponent === 'ListTable' ? __( 'Integrations', 'swise' ) : __( 'Add New', 'swise' )}
                </h1>
                <button
                    onClick={() => setActiveComponent( activeComponent === 'ListTable' ? 'NewIntegration' : 'ListTable' )}
                    className="page-title-action">
                    {activeComponent === 'ListTable' ? __( 'Add New', 'swise' ) : __( 'Back', 'swise' )}
                </button>
                <DynamicComponent is={activeComponent} />
            </div>
        </>
    )
}