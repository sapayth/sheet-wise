import React, {Fragment, useState} from 'react';

import Header from './Header';
import {HashRouter, Routes, Route} from 'react-router-dom';
import dashboard from '../routes/dashboard';
import NewIntegration from './NewIntegration';
import ListTable from './ListTable';
import EditIntegration from './EditIntegration';
import {Notice} from '@wordpress/components';
import Navigation from './Navigation';

export default function Dashboard() {
    const [notices, setNotices] = useState( [] );

    return (
        <>
            <Header version={swiseDashboard.version}/>
            {notices.map( ( notice, index ) => (
                <Notice
                    key={index}
                    status={notice.type}
                    className="swise--ml-[20px]"
                    isDismissible={true}
                    onRemove={() => setNotices( notices.filter( ( item, i ) => i !== index ) )}
                >
                    {notice.message}
                </Notice>
            ) )}
            <HashRouter>
                <Navigation/>
                <Routes>
                    <Route path={dashboard.home} element={<ListTable setNotices={setNotices} />}/>
                    <Route
                        path={dashboard.integrations.create}
                        element={<NewIntegration setNotices={setNotices} />}/>
                    <Route
                        path={dashboard.integrations.edit}
                        element={<EditIntegration setNotices={setNotices} />}/>
                </Routes>
            </HashRouter>
        </>
    )
}