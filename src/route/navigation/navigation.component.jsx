import { Fragment, useContext } from "react";
import { Outlet ,Link} from "react-router-dom";

import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {NavigationContaioner, LogoContainer, NavLink, NavLinks} from './navigation.styles';
const Navigation = () =>{
  const {currentUser }=useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
    return(
    <Fragment>
      <NavigationContaioner>
      <LogoContainer to='/'>
        <CrwnLogo className="logo"/>
        </LogoContainer>
        <NavLinks>
            <NavLink to='/shop'>
            Shop
            </NavLink>
            {
              currentUser ?(
                <NavLink as='span' onClick={signOutUser}>
                  Sign Out 
                  </NavLink>) :(
                <NavLink to='/auth'>
                Sign In
                </NavLink>
              )}
              <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContaioner>
      <Outlet/>
      </Fragment>
      );
  }
  export default Navigation;