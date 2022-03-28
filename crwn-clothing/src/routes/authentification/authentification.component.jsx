import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import {
    auth, 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect, 
} from '../../utils/firebase/firebase.utils'

const Authentification = () => {
    
    return (
      <div>
        <h1>Sign In Page</h1>
        <SignInForm />
        <SignUpForm />
      </div>
    );
  };

export default Authentification;