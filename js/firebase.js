// firebase.js
// Configuração do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Substitua pelos dados do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2Zc2WQRZZt-jkU1HYeOupfHpLc-mSygo",
  authDomain: "after-server.firebaseapp.com",
  projectId: "after-server",
  storageBucket: "after-server.appspot.com",
  messagingSenderId: "835893170150",
  appId: "1:835893170150:web:b2edbe4cb4616e57489027",
  measurementId: "G-Y19V9G8YFV"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
