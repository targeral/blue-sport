/// <reference types="react-dom/experimental" />
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
    <App />
);

function urlBase64ToUint8Array(base64String: string) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4); var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/'); var rawData = window.atob(base64); var outputArray = new Uint8Array(rawData.length); for (var i = 0, max = rawData.length; i < max; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        } return outputArray;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BIym4SHHGxnWHJKbuDwGZjyoZMCp-OI8fi0WDTDfzhFmTazpaIZ39pjo8nqik1ZIlGZBrvUuwBNOuegR7_ivIas')
            });
        }).catch(registrationError => {
            console.log('SW registration failed: 111', registrationError);
        });

        navigator.serviceWorker.ready.then(function (reg) {
            return reg.sync.register('tag-name').then(res => {
                console.log('background sync');
            }).catch(function (err) {
                console.log('后台同步触发失败', err);
            });
        });
    });
}