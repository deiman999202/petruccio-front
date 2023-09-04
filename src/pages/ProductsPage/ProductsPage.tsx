import { useEffect, useState } from 'react'
import {useSearchParams } from 'react-router-dom';
import axios from 'axios'
import env from "react-dotenv"
import ReactLoading from 'react-loading';
import './ProductsPage.scss'
import ProductCard from '../../components/ProductCard/ProductCard'

interface Ingredients {
  name: string,
  price: number
}

interface PizzaObj {
  pizzaId: number,
  name: string;
  img: string;
  ingredients: Array<string>,
  price: number,
  sizes: Array<string>,
  adding: Array<Ingredients>,
  spicyLvl: Number,
  vegan: boolean
}

interface DrinkObj{
  name: string,
  price: number,
  img: string,
  isSweet: boolean
}

interface SauceObj{
  name: string,
  price: number,
  img: string,
}

const IndexPage = () => {

  const [searchParams] = useSearchParams();
  const [pizzaArr, setPizzaArr] = useState<any[]>([])
  const [drinksArr, setDrinksArr] = useState<any[]>([])
  const [saucesArr, setSaucesArr] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [noSpicy, setNoSpicy] = useState(false)
  const [onlyVegan, setOnlyVegan] = useState(false)
  const [noSugar, setNoSugar] = useState(false)

  useEffect(() => { 
    if(saucesArr.length === 0 && pizzaArr.length === 0 && drinksArr.length === 0){
      setLoading(true)
    }
    else{
      setLoading(false)
    }
    
  }, [setPizzaArr, setDrinksArr, setSaucesArr, saucesArr.length, pizzaArr.length, drinksArr.length])

  useEffect(() => { 
    if (!searchParams.get("product")) {
      axios.post(env.API_URL + '/products', {productName: "pizza", specialties: [{noSpicy}, {onlyVegan}]}).then(response => {
      setPizzaArr(response.data)
      setDrinksArr([])
      setSaucesArr([])
    })
  }
  else if (searchParams.get("product") === 'drinks'){
    axios.post(env.API_URL + '/products', {productName: "drinks", specialties: [{noSugar}]}).then(response => {
      setDrinksArr(response.data)
      setPizzaArr([])
      setSaucesArr([])
  })
}else if (searchParams.get("product") === 'sauces'){
  axios.post(env.API_URL + '/products', {productName: "sauces", specialties: []}).then(response => {
    setSaucesArr(response.data)
    setPizzaArr([])
    setDrinksArr([])
})
}
  }, [setPizzaArr, setDrinksArr, setSaucesArr, searchParams, noSpicy, onlyVegan, noSugar])

  return (
    <div className="order">
      {/* Left side with filters */}
      <aside>
       <h2>Filters:</h2>
      {!searchParams.get("product") && <div className="pizza-filters">
        <h3>Pizza</h3>
        <div className="checkbox-rect">
          <input type="checkbox" name="no-spicy" id="no-spicy" onChange={() => {
            setNoSpicy(!noSpicy)
          }}/>
          <label htmlFor="no-spicy">No spicy</label>
        </div>
        <div className="checkbox-rect">
          <input type="checkbox" name="vegan" id="vegan" onChange={() => {
            setOnlyVegan(!onlyVegan)
          }}/>
          <label htmlFor="vegan">Vegan</label>
        </div>
      </div>} 
      {searchParams.get("product") === 'drinks' && <div className="drinks-filters">
        <h3>Drinks</h3>
        <div className="checkbox-rect">
          <input type="checkbox" name="no-sugar" id="no-sugar" onChange={() => {
            setNoSugar(!noSugar)
          }} />
          <label htmlFor="no-sugar">No sugar</label>
        </div>
      </div>}
      </aside>
      {/* Right side with products */}
      <div id='products' className="products">
        <h2>Yummy stuff for your belly</h2>
        <div className="list">
        {loading && <ReactLoading className='loader' type={"spinningBubbles"} color={"#e99f27"} height={400} width={400} />}
        {pizzaArr.length !== 0 && pizzaArr.map((pizza: PizzaObj) => {
          return <ProductCard product={pizza} key={pizza.pizzaId} />
          })}
        {drinksArr.length !== 0 && drinksArr.map((drink: DrinkObj) => {
          return <ProductCard product={drink} key={drink.name} />
          })}
        {saucesArr.length !== 0 && saucesArr.map((sauce: SauceObj) => {
          return <ProductCard product={sauce} key={sauce.name} />
          })}
        </div>

        
      </div>
        

      </div>

  )
}

export default IndexPage


   // useEffect(() => {
  //   axios.post('http://localhost:5000/sauces', {sauces: sausesArr})
  // }, [])
  
  
  
  