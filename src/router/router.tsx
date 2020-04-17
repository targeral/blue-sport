import React, { Reducer, FunctionComponent, Component } from 'react';
import { useReducer, useMemo, useEffect, useLayoutEffect } from 'react';
import { Fallback } from './components/fallback';

export interface RouterProps {
    query: {
        [key: string]: string
    }
}

type RouterComponent = FunctionComponent<RouterProps> | Component<RouterProps>

export interface Route {
    path: string;
    component: RouterComponent;
}

interface RouterState {
    currentHash: string;
    query: {
        [key: string]: string
    };
}

interface RouterAction {
    type: RouterActionEnum;
    payload?: Partial<RouterState>;
}

enum RouterActionEnum {
    updateCurrentHash,
    updateQuery
};

const initialState: RouterState = {
    currentHash: '/',
    query: {}
};

const reducer: Reducer<RouterState, RouterAction> = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case RouterActionEnum.updateCurrentHash:
            return {
                ...state,
                currentHash: payload.currentHash
            };
        
        case RouterActionEnum.updateQuery:
            return {
                ...state,
                query: payload.query
            };
        default:
            break;
    }
};

// 404页面的url
const FallBackUrl = 'fallback';

const getHashUrl = (hash: string, fallback = '/'): string => {
    const urlWithQuery = hash.split('#')[1] || fallback;
    return urlWithQuery.split('?')[0];
};

const getHashQuery = (hash: string, fallback = '/') => {
    const urlWithQuery = hash.split('#')[1] || fallback;
    const queryString = urlWithQuery.split('?')[1];
    let queryObject = {};
    if (queryString) {
        queryObject = queryString.split('&').reduce((queryObject, kv) => {
            const [key, value] = kv.split('=');
            return { ...queryObject, [key]: value };
        }, {});
    }
    
    return queryObject;
};

const routeFallbackPage = (component: RouterComponent) => {
    const url = getHashUrl(location.hash);

    if (url !== FallBackUrl) {
        location.hash = FallBackUrl;
    }

    return component;
};

export const useRouter = (routes: Route[], fallback: RouterComponent = Fallback) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const routesMap = useMemo(() => {
        const map = new Map<string, RouterComponent>();

        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            map.set(route.path, route.component);
        }

        return map;
    }, [routes]);

    let AppWithRouter;

    if (routesMap.has(state.currentHash)) {
        AppWithRouter = routesMap.get(state.currentHash);
    } else {
        AppWithRouter = routeFallbackPage(fallback);
    }

    // 页面初始化根据url展示开始时候的页面
    useLayoutEffect(() => {
        const currentHashUrl = getHashUrl(location.hash);
        dispatch({
            type: RouterActionEnum.updateCurrentHash,
            payload: {
                currentHash: currentHashUrl
            }
        });
    }, []);

    // 注册hashchange监听事件
    useEffect(() => {
        window.addEventListener('hashchange', (event) => {
            const newHash = getHashUrl(location.hash);
            const newQuery = getHashQuery(location.hash);
            console.log('hash change');
            dispatch({
                type: RouterActionEnum.updateQuery,
                payload: {
                    query: newQuery
                }
            });
            dispatch({
                type: RouterActionEnum.updateCurrentHash,
                payload: {
                    currentHash: newHash
                }
            });
        });
    }, []);

    return <AppWithRouter query={state.query} />;
};
