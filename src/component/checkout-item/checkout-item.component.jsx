import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import {CheckoutItemContainer, ImageContainer, TextContainer ,QuantityContainer, RemoveButton} from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {
    const {name ,quantity ,imageUrl ,price} = cartItem;
    const {clearItemFromCart ,addItemToCart ,removeItemToCart} = useContext(CartContext);
    const clearItemHandler = () =>clearItemFromCart(cartItem); 
    const addItemHandler = () =>addItemToCart(cartItem);
    const removeItemHandler = () =>removeItemToCart(cartItem);

    return(
       <CheckoutItemContainer>
        <ImageContainer>
        <img src={imageUrl} alt={`${name}`}/>
        </ImageContainer> 
        <TextContainer>{name}</TextContainer>
        <QuantityContainer>
            <div className='arrow' onClick={removeItemHandler}>
                &#10094;
            </div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>
            &#10095;
            </div>
            </QuantityContainer> 
        <TextContainer>{price}</TextContainer> 
        <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>       
       </CheckoutItemContainer>
    );
}

export default CheckoutItem; 