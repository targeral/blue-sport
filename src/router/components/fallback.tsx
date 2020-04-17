import React, { FunctionComponent } from 'react';
import { RouterProps } from '../../router/router';

export const Fallback: FunctionComponent<RouterProps> = () => {
    return (
        <div>
            This is 404.
        </div>
    );
};