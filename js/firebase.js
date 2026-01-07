const firebaseConfig = {
  apiKey: "AIzaSyB2Zc2WQRZZt-jkU1HYeOupfHpLc-mSygo",
  authDomain: "after-server.firebaseapp.com",
  projectId: "after-server",
  storageBucket: "after-server.appspot.com",
  messagingSenderId: "835893170150",
  appId: "1:835893170150:web:b2edbe4cb4616e57489027"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Auth
const auth = firebase.auth();
