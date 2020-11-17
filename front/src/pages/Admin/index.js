import React from "react";
import {Admin, Resource} from 'react-admin';
import {theme, initialState} from "./styles";
import {authProvider, dataProvider, i18nProvider} from '../../utils';
import NotFound from '../../components/NotFound';
import Dashboard from '../../components/Dashboard';
import Crew from '../../components/Crew';
import CustomLayout from '../../components/Layout';

export default function AdminPage() {
    return (
        <Admin title="BC Dashboard" authProvider={authProvider} dataProvider={dataProvider}
               i18nProvider={i18nProvider} catchAll={NotFound} dashboard={Dashboard} layout={CustomLayout}
               initialState={initialState}
        >
            <Resource options={{label: 'Equipe'}} name="users" {...Crew}/>
        </Admin>
    )
}
