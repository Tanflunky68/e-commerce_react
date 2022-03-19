import { useState } from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const defaultFormField = {
    displayName:'',
    email:'',
    password:'',
    confirmedPassword:''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmedPassword} = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormField);
    }

    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields, [name]:value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(password!=confirmedPassword){
           alert("password do not match");
           return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormField();
        }catch(error){
            if(error.code='auth/email-already-in-use'){
                alert('Cannot create user because email already in use');
            }else{
                console.error(error);
            }
        }
        
    } 

    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name='displayName' value={displayName}/>
                
                <label>Email</label>
                <input type="email" required onChange={handleChange} name='email' value={email}/>

                <label>Password</label>
                <input type="password" required  onChange={handleChange} name='password' value={password}/>

                <label>Confirm Password</label>
                <input type="password" required  onChange={handleChange} name='confirmedPassword' value={confirmedPassword}/>
            
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;