const env = import.meta.env;

const AUTH_ROUTER = `/api/auth`;
const MESSAGES_ROUTE = `/api/messages`;

export default {
  API: {
    URL: env.VITE_API_URL || "http://localhost:6060",
    ENDPOINT: {
      USER: {
        CHECK_USER: `${AUTH_ROUTER}/check-user`,
        GET_ALL_CONTACTS: `${AUTH_ROUTER}/get-contacts`,
        onBoardUserRoute: `${AUTH_ROUTER}/onboarduser`,
      },
      MESSAGE: {
        ADD_MESSAGE: `${MESSAGES_ROUTE}/add-message`,
        GET_MESSAGES_ROUTE: `${MESSAGES_ROUTE}/get-messages`,
        GET_INITIAL_CONTACTS_ROUTE: `${MESSAGES_ROUTE}/get-initial-contacts`,
      },
    },
  },
  FIRE_BASE: {
    apiKey:
      env.VITE_FIREBASE_API_KEY || "AIzaSyDzMmqxkJKpqOzm1qvP4chdURVBjpG5OIs",
    authDomain:
      env.VITE_FIREBASE_AUTH_DOMAIN ||
      "fir-realtime-chat-9803b.firebaseapp.com",
    projectId: env.VITE_FIREBASE_PROJECT_ID || "fir-realtime-chat-9803b",
    storageBucket:
      env.VITE_FIREBASE_STORAGE_BUCKET || "fir-realtime-chat-9803b.appspot.com",
    messagingSenderId: env.VITE_FIREBASE_MESSAGE_SENDER_ID || "767013984904",
    appId:
      env.VITE_FIREBASE_APP_ID || "1:767013984904:web:89e51919b9ccd273ea5d3d",
    // measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-KHVXD75VD7",
  },
};
