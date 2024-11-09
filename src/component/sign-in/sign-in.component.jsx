import {useState} from 'react';
import { 
    signInWithGooglePopup ,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import {SignUpContainer, ButtonsContainer} from './sign-in.styles.jsx';
import Button ,{BUTTON_TYPE_CLASSES} from '../button/button.component';
const defaultFormFields={
     email :'',
     password :'',
};

const SignIn = () =>{
    const [formFields ,setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
    const signInWithGoogle = async () =>{
     await signInWithGooglePopup();
        
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/invalid-credential'){
                alert('Invalid password or email. Plese try again!')
            }
        } 
    };

    const handleChange =(event) =>{
        const {name ,value} =event.target;
        setFormFields({...formFields, [name]:value})
    };

    return(
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign In with email and password.</span>
            <form onSubmit={handleSubmit}>

                <FormInput type="email" 
                label= 'Email'
                required
                onChange={handleChange}
                name ='email'
                value={email}/>

                <FormInput type="password" 
                label= 'Password'
                required 
                onChange={handleChange}
                name ='password'
                value={password}/>
            <ButtonsContainer>
                <Button type="submit">Sign In</Button>
                <Button buttonTypes={BUTTON_TYPE_CLASSES.google} type ='button' onClick={signInWithGoogle}>Google Sign In </Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    );
}

export default SignIn;