import SignUp from "../../component/sign-up/sign-up.component";
import SignIn from "../../component/sign-in/sign-in.component";
import {AuthenticationContainer} from './authentication.styles';
const Authenticaiton =() => {
   
  return (
 <AuthenticationContainer>
    <SignIn/>
    <SignUp/>
  </AuthenticationContainer>);
}

export default Authenticaiton;