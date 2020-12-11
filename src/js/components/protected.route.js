import React from 'react';
import { Redirect, Route } from 'react-router';

import { Auth } from './auth';

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                if (new Auth().isAutheticated) {
                    return <Component {...props} />
                } else {
                    return (
                        <Redirect to={{
                            pathname: "/signin",
                        }} />
                    );
                }
            }
            } />
    )
}