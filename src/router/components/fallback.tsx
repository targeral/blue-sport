import React, { FunctionComponent } from 'react';
import { AppWithRouterProps } from '../../router/router';

export const Fallback: FunctionComponent<AppWithRouterProps> = () => {
    return (
        <div>
            This is 404.
        </div>
    );
};