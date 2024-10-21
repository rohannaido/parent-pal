// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBNpK4Nwanldyx110m39Su0KyXyrocqCxE",
    authDomain: "parent-pal-5e684.firebaseapp.com",
    projectId: "parent-pal-5e684",
    storageBucket: "parent-pal-5e684.appspot.com",
    messagingSenderId: "25963526332",
    appId: "1:25963526332:web:a8bcda42aa118b67b938b9"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './logo.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});