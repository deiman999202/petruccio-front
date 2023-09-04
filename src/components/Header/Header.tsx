import { useEffect } from 'react';
import { Link, useSearchParams, useLocation, useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/slice/cartSlice';
import './Header.scss';
import mainLogo from '../../assets/main_logo.png'
import cart from '../../assets/cart.png'


const Header = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const cartValue = useSelector((state: any) => state.cart.value)
  

  function addQuery(querName:string){
    if(location.pathname !== '/'){
      return navigate(`/?product=${querName}`)
    }
    setSearchParams(`product=${querName}`)
  }
  

  return (
    <header id='header'>
      {/* Part with logo and the name */}
      <div className="logo-cart">
        <Link to={'/'} className="logo-container">
            <img className='main-logo' src={mainLogo} alt="pizza shop" />
            <h1>Pizza Petruccio</h1>
          </Link> 

          <span className="cart-block dis-fa">
            <div className="cart dis-fa">
              <img className='cart-img' src={cart} alt="cart" />
              <Link to={'/cart'}><span>Go to cart</span><span className="cart-len">{cartValue.length}</span></Link>
            </div>
          </span>
      </div>
        {/* All options, like pizzas, drinks */}
        <span className="options">
          <Link className={`${!searchParams.get("product") && location.pathname === '/' && 'active'} link`} to={'/'}>Pizzas</Link>
          <span className={`${searchParams.get("product") && searchParams.get("product") === 'sauces' &&  'active'} link`} onClick={() => {
            addQuery("sauces")
          }}>Sauses</span>
          <span className={`${searchParams.get("product") && searchParams.get("product") === 'drinks' && 'active'} link`} onClick={() => {
            addQuery("drinks")
          }}>Drinks</span>
          <Link className={`${location.pathname === '/about' && 'active'} link`} to={'/about'}>About us</Link>
          <a className='link' href='#footer'>Contacts</a>
        </span>
          {/* cart right part */}
        

      
        

    </header>
  )
}

export default Header