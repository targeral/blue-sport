import React, { FunctionComponent } from 'react';
import { RouterProps } from '../../router/router';

export const Home: FunctionComponent<RouterProps> = (props: RouterProps) => {
    console.log(props);
    return (
        <div>
            This is Home Page.
            <a href="#/login">to login</a>
        </div>
    );
}
