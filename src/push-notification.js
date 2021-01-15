/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import firebase from 'firebase/app';
// import '@firebase/messaging';

// Function to initialize Firebase app
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: '<FCM Sender ID>',
  });
};

// Function to initialize push notification
export const initializePushNotification = async () => {
  try {
    // Send permission request
    const messaging = firebase.messaging();
    // await messaging.requestPermission();

    // Get the registration token and save it to localStorage
    const token = await messaging.getToken();
    console.log('Token: ', token);
    localStorage.setItem('notification-token', token);

    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage((payload) => {
      console.log('Notification received', payload);
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};
