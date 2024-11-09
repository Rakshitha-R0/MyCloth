import{ItemDetails, CartItemContainer, ItemName} from './cart-item.styles.jsx';

const CartItem = ({cartItem}) =>{
    const {name ,imageUrl ,price ,quantity} = cartItem;
 return(
    <CartItemContainer>
       <img width ="30%" src={imageUrl} alt={`${name}`} />
       <ItemDetails>
        <ItemName>{name}</ItemName>
       <span className='price'>
        {quantity} x ${price}
        </span>
       </ItemDetails>
    </CartItemContainer>
 );
}

export default CartItem;