import AppRoutes from "./routes";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyCcPW_2CU-lfts53hVgYKi7YmgIDAzK9S4",
    authDomain: "tharseo-c8cb9.firebaseapp.com",
    projectId: "tharseo-c8cb9",
    storageBucket: "tharseo-c8cb9.firebasestorage.app",
    messagingSenderId: "911731612364",
    appId: "1:911731612364:web:f59461e2e5b12cc6080069",
    measurementId: "G-HJDWVMTTD0"
  };
  
  const app = initializeApp(firebaseConfig);
  //tslint:disable-next-line
  const analytics = getAnalytics(app);



  return <AppRoutes />;
}

export default App;
