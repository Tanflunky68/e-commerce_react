import { useState } from "react";
import {createUserDocumentFromAuth, signInWithGooglePopup, signInAuthWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.style.scss'



const defaultFormField = {
    email:'',
    password:''
}

const SignInForm = () => {

    const signInWithGoogle = async () => {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    };

    const [formFields, setFormFields] = useState(defaultFormField);
    const {email, password} = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormField);
    }

    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields, [name]:value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            const response = await signInAuthWithEmailAndPassword(email,password);
            console.log(response);
            resetFormField();
        }catch(error){
           
        }
        
    } 

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label='Email'
                type='email'
                required
                onChange={handleChange}
                name='email'
                value={email}
                />

                <FormInput
                label='Password'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}
                />
                <div className="buttons-container">
                    <Button children={'Sign In'}/>
                    <Button children={'Google Sign In'} buttonType={'google'} onClick={signInWithGooglePopup}></Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;