import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
// import {registerRoute} from 'workbox-routing';

console.log(`Yay! Workbox is loaded 🎉`);
skipWaiting();
clientsClaim();

self.addEventListener('activate', async () => {
    console.log('service worker activate');
})

// registerRoute(
//     new RegExp('https://hacker-news.firebaseio.com'),
//     new workbox.strategies.StaleWhileRevalidate()
// );

self.addEventListener('push', (event) => {
    const title = 'Get Started With Workbox';
    const options = {
        body: event.data.text()
    };
    console.log('push');
    event.waitUntil(self.registration.showNotification(title, options));
    if (event.data) {
        console.log('Push event!! ', event.data.text())
    } else {
        console.log('Push event but no data')
    }
});

self.addEventListener('sync', (e) => {
    console.log(`service worker需要进行后台同步，tag: ${e.tag}`);
    const request = new Request('https://github.com/users/targeral/feature_preview/indicator_check', {
        method: 'GET',
        mode: 'no-cors'
    });
    e.waitUntil(
        fetch(request).then(function (response) {
            response.json().then(console.log.bind(console));
            return response;
        })
    );
});

precacheAndRoute(self.__WB_MANIFEST);
