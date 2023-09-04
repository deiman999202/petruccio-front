import './CartPage.scss'
import { useState, useEffect } from 'react'
import { deleteFromCart } from '../../redux/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartPage = () => {

  const dispatch = useDispatch()
  const cartValue = useSelector((state: any) => state.cart.value)
  const [finalPrice, setFinalPrice] = useState(0)

  useEffect(() => {
    if(cartValue.length === 0){
      setFinalPrice(0)
    }
    else{
      let newPrice = 0
      cartValue.map((product:any) => newPrice += product.price)
      setFinalPrice(newPrice)
    }
  }, [cartValue])


  return (
    <div className='cart-page'>
      {cartValue.length === 0
      ?
      <div className="empty-cart">
        There is nothing in your cart yet. Try to add some drink, sause, and pizza.
      </div>
      :
      <div className="cart-full">
      <div className="cart-products">
        {cartValue.map((item: any) => {
          return <span className='cart-product'>
            <img className='cart-product-image' src={item.img} alt="nice product pic" />
            {item.hasOwnProperty('size') && <h4 className='cart-product-size'>{item.size}</h4>}
            <h4 className='cart-product-name'>{item.name}</h4>
            {item.hasOwnProperty('addings') && item.addings.length !== 0 && <h4 className='cart-product-addings'>+addings</h4>}
            <h4 className='cart-product-price'>${item.price}</h4>
            <button className="delete-product" onClick={() => dispatch(deleteFromCart({id: item.id}))}>-</button>
          </span>
        })}
      </div>
      <div className="cart-bottom">
        <span className='final-price'>${(finalPrice.toFixed(2))}</span>
        <button className='finish-order' onClick={() => alert("Thank you for using my pet project. Of course such pizzeria doesn't exist. Hope to create something for commercial purpose. If you want to contact me, click on my name in footer.")}>Finish your order</button>
      </div>
      
      </div>
      }
    </div>
  )
}

export default CartPage