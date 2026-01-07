// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js";

// CONFIG DO SEU PROJETO
const firebaseConfig = {
  apiKey: "AIzaSyB2Zc2WQRZZt-jkU1HYeOupfHpLc-mSygo",
  authDomain: "after-server.firebaseapp.com",
  projectId: "after-server",
  storageBucket: "after-server.appspot.com",
  messagingSenderId: "835893170150",
  appId: "1:835893170150:web:b2edbe4cb4616e57489027"
};

// INICIALIZA
const app = initializeApp(firebaseConfig);

// EXPORTA GLOBALMENTE
window.auth = getAuth(app);
window.db = getFirestore(app);

console.log("🔥 Firebase conectado com sucesso");
