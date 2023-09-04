import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import env from "react-dotenv"
import {useSearchParams } from 'react-router-dom';
import { addToCart } from '../../redux/slice/cartSlice';
import PopUp from '../PopUp/PopUp';
import './ProductCard.scss'

const ProductCard = (props:any) => {

  const {_id, name, img, price, ingredients = undefined, pizzaId = undefined} = props.product
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch()
  const [popUp, showPopUp] = useState(false)



  function getProduct(){
    if (!searchParams.get("product")){
      window.scroll(0, 0)
      showPopUp(true)
    }else{
    axios.post(env.API_URL + '/product', {id: _id, product: searchParams.get("product") || "pizza"}).then(response => {
      const {name, price, img} = response.data
      dispatch(addToCart({id: _id, name, price, img}))
    })
  }
  }

  return (
    <div className="card">
          <h3 className='card-title'>{name}</h3>
          <img className='card-img' src={img} alt={`${name}`} />
          {ingredients && <p className="ingredients">
            {ingredients.map((ingredient:string, index:number) => {
              if (index === ingredients.length - 1){
                return <i key={ingredient}>{ingredient + " "}</i>
              }
              else{
                return <i key={ingredient}>{ingredient + ", "}</i>
              }
            })}
          </p>}
          <div className="bottom">
            <button className="buy" onClick={getProduct}>{pizzaId ? "Order" : "Add to cart"}</button>
            <span className='price'>{pizzaId ? "from" : ""} ${price}</span>
          </div>
      {popUp && <PopUp showPopUp={showPopUp} product={props.product}/>}
    </div>
  )
}

export default ProductCard