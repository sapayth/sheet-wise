import React from 'react';
import {__} from '@wordpress/i18n';
import dashboard from '../routes/dashboard';
import {useLocation, useNavigate} from 'react-router-dom';

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const navigationButton = () => {
        if ( pathname === dashboard.integrations.create ) {
            return (
                <button
                    onClick={() => navigate( dashboard.home )}
                    className="page-title-action">
                    {__( 'Back to List', 'swise' )}
                </button>
            );
        }

        return (
            <button
                onClick={() => navigate( dashboard.integrations.create )}
                className="page-title-action">
                {__( 'Add New', 'swise' )}
            </button>
        );
    }

    const title = () => {
        if ( pathname === dashboard.integrations.create ) {
            return __( 'Add New Integration', 'swise' );
        }

        return __( 'Integrations', 'swise' );
    }

    return (
        <div className="wrap">
            <h1 className="wp-heading-inline">
                {title()}
            </h1>
            {navigationButton()}
        </div>
    );
}
