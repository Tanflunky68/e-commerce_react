import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpdXBCPI8gfizYVjLZBs0x2f86UBMVCoc",
  authDomain: "crwn-clothing-db-4d0a8.firebaseapp.com",
  projectId: "crwn-clothing-db-4d0a8",
  storageBucket: "crwn-clothing-db-4d0a8.appspot.com",
  messagingSenderId: "321230218319",
  appId: "1:321230218319:web:a9ae4ef8607ecc9a2ab63a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters ({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();


export const createUserDocumentFromAuth = async (
  userAuth,
   additionnalInformation = {}
   ) => {

  if(!userAuth) return;
  const userDocRef = doc(db,'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email}  = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionnalInformation,
      });
    } catch(error){
      console.log('error creating the user: ',error.message)
    }
  }

  return userDocRef;
};



export const createAuthUserWithEmailAndPassword = async (email,password) =>{

  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password)
}


export const signInAuthWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password)

}