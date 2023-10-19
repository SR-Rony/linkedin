// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzDhIZZWJ53k1Ifx8Z7-ix1zeQM1xeYSc",
  authDomain: "linkedin-73244.firebaseapp.com",
  databaseURL: "https://linkedin-73244-default-rtdb.firebaseio.com",
  projectId: "linkedin-73244",
  storageBucket: "linkedin-73244.appspot.com",
  messagingSenderId: "14744903176",
  appId: "1:14744903176:web:10f41db3923c8fbbb37bbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;