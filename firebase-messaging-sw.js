importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDSx1Wb3E4X0eWAJoTYfIRFASkU5JIae84",
  authDomain: "sangam-wedding.firebaseapp.com",
  projectId: "sangam-wedding",
  storageBucket: "sangam-wedding.appspot.com",
  messagingSenderId: "502527114604",
  appId: "1:502527114604:web:84b916eb84917ee0ac4749"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title || 'Default Title';
  const notificationOptions = {
    body: payload.notification.body || 'Default body message.',
    icon: '/icons/wedding144.png' // Ensure this path is correct
  };
  window.alert(payload.notification.body);
  self.registration.showNotification(notificationTitle, notificationOptions)
    .catch(error => console.error('Error showing notification:', error));
});