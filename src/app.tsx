import React from 'react';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {useRouter, Route} from './router/router';

const routes: Route[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    }
];

export const App = () => {
    const AppWithRouter = useRouter(routes);
    return (
        <>
            {AppWithRouter}
        </>
    );
};
