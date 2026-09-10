// This file MUST sit at the site root (same folder as index.html), not inside
// any subfolder — Firebase Cloud Messaging requires it to be served from
// https://your-site.com/firebase-messaging-sw.js exactly.

importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB2AQG1mapkuXhus5PaCTmW8FZ7N9RCnog",
  authDomain: "tovi-zol-center.firebaseapp.com",
  projectId: "tovi-zol-center",
  storageBucket: "tovi-zol-center.firebasestorage.app",
  messagingSenderId: "577668091153",
  appId: "1:577668091153:web:36b7e4a1f2a1b86b3550b0"
});

var messaging = firebase.messaging();

// Shows a system notification when a push arrives while the site tab is
// closed or in the background.
messaging.onBackgroundMessage(function (payload) {
  var title = (payload.notification && payload.notification.title) || 'עדכון חדש';
  var options = {
    body: (payload.notification && payload.notification.body) || ''
  };
  self.registration.showNotification(title, options);
});
