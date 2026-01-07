<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyB2Zc2WQRZZt-jkU1HYeOupfHpLc-mSygo",
    authDomain: "after-server.firebaseapp.com",
    projectId: "after-server",
    storageBucket: "after-server.appspot.com",
    messagingSenderId: "835893170150",
    appId: "1:835893170150:web:b2edbe4cb4616e57489027"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
</script>
