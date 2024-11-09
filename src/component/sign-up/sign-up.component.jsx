import {useState} from 'react';
import { 
    createAuthUserWithEmailAndPassword ,
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import {SignUpContainer} from './sign-up.styles';
import Button from '../button/button.component';
const defaultFormFields={
     displayName : '',
     email :'',
     password :'',
     confirmPassword:'',
}

const SignUp = () =>{
    const [formFields ,setFormFields] = useState(defaultFormFields);
    const {displayName , email, password, confirmPassword} = formFields;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert('passwords not the same');
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user ,{displayName});
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('This email is already available.')
            }
        } 
    };

    const handleChange =(event) =>{
        const {name ,value} =event.target;
        setFormFields({...formFields, [name]:value})
    };

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign In with email and password.</span>
            <form onSubmit={handleSubmit}>

                <FormInput type="text" 
                label= 'Display Name'
                required
                onChange={handleChange}
                name ='displayName'
                value={displayName}/>

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

                <FormInput type="password"
                label= 'Confirm Password'
                required
                onChange={handleChange}
                name ='confirmPassword'
                value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUp;