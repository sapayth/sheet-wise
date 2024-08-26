import React, {Fragment, useState} from 'react';

import Header from './Header';
import {__} from '@wordpress/i18n';
import {HashRouter, Routes, Route} from 'react-router-dom';
import dashboard from '../routes/dashboard';
import NewIntegration from './NewIntegration';
import ListTable from './ListTable';

export default function Dashboard() {
    const [activeComponent, setActiveComponent] = useState( 'ListTable' );

    return (
        <>
            <Header version={swiseDashboard.version}/>
            <div className="wrap">
                <HashRouter>
                    <Routes>
                        <Route path={dashboard.home} element={<ListTable/>}/>
                        <Route
                            path={dashboard.sheets.create}
                            element={<NewIntegration setActiveComponent={setActiveComponent}/>}/>
                    </Routes>
                </HashRouter>
            </div>
        </>
    )
}