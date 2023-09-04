import './PopUp.scss'
import { useState, useEffect } from 'react'
import { addToCart } from '../../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

const PopUp = (props:any) => {

    interface Adding{
      name: string,
      price: number
    }

    const [currentSize, setCurrentSize] = useState(props.product.sizes[0])
    const [currentPrice, setCurrentPrice] = useState(props.product.price)
    const [addingsArr, setAddingsArr] = useState<any[]>([])
    const dispatch = useDispatch()


    function toggleAdding(adding:Adding){
      if (addingsArr.includes(adding)){
        const newArr = addingsArr.filter((add:any) => add.name !== adding.name )
        setAddingsArr(newArr)
      }else{
        const newArr = [adding].concat(addingsArr)
        setAddingsArr(newArr) 
      }
    }



    useEffect(() => {
      if(addingsArr.length === 0){
        let newPrice = props.product.price
        if(currentSize !== props.product.sizes[0]){
          newPrice += props.product.sizes.indexOf(currentSize) * 2
        }
        setCurrentPrice(newPrice)
      }else{
        let newPrice = props.product.price
        addingsArr.map((adding:any) => {
          newPrice += adding.price
          return ""
        })
        if(currentSize !== props.product.sizes[0]){
          newPrice += props.product.sizes.indexOf(currentSize) * 2
        }
        setCurrentPrice(newPrice)
      }
    }, [addingsArr, currentSize, props.product.price, props.product.sizes])


  return (
    <div className="pop-up" onClick={(e) => {
        if(e.target === e.currentTarget){
          props.showPopUp(false)
        }
      }}>
            <div className="pizza-choose">
              <h2>{props.product.name}</h2>
              <img src={props.product.img} alt="pizza" />
              <span className='sizes'>{props.product.sizes.map((size: string, index: number) => {
                    return <span key={size} onClick={() => setCurrentSize(size)} className={`size ${currentSize === size ? 'active' : ''}`}>{size}</span>
              })}
              </span>
              <div className="addings">
                <h4>Add to pizza</h4>
                <div className="addings-list">
                  {props.product.addings.map((adding:Adding) => {
                    return <span onClick={() => toggleAdding(adding)} className={`adding ${addingsArr.includes(adding) ? 'active' : ''}`}>😍<span className="name">{adding.name}</span> <span className='price'>${adding.price}</span></span>
                  })}
                </div>
              </div>
            <div className="bottom">
                <span className='price'>${currentPrice}</span>
                <button className="buy" onClick={() => {
                  dispatch(addToCart({id: props.product._id, name: props.product.name, price: currentPrice, img: props.product.img, size: currentSize, addings: addingsArr}))
                  props.showPopUp(false)
                }}>Add to cart</button>
            </div>
            </div>
      </div>
  )
}

export default PopUp