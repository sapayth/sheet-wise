import React, {Fragment, useState} from 'react';

import Header from './Header';
import {HashRouter, Routes, Route} from 'react-router-dom';
import dashboard from '../routes/dashboard';
import NewIntegration from './NewIntegration';
import ListTable from './ListTable';
import EditIntegration from './EditIntegration';

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
                            path={dashboard.integrations.create}
                            element={<NewIntegration setActiveComponent={setActiveComponent}/>}/>
                        <Route
                            path={dashboard.integrations.edit}
                            element={<EditIntegration />}/>
                    </Routes>
                </HashRouter>
            </div>
        </>
    )
}