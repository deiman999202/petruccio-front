import './Footer.scss'

const Footer = () => {
  return (
    <footer className='dis-fa' id='footer'>
      <div className="details">
        <span>We have been cooking pizza with love since 1985</span> 
        <span>Our delivery works in Cherkasy, Kyiv and Poltava. But soon here will be your city too:)</span> 
      </div>
      <div className="contacts">
       <span>The father of this site is <a href="https://www.linkedin.com/in/dmytro-voloshyn-151a0b1bb/">Dmytro Voloshyn</a></span> 
       <span>If you have any questions please contact me:)</span>
      </div>
      <div className="go-back">
       <p onClick={() => window.scrollTo(0, 0)}>Go to the top</p>
      </div>
    </footer>
  )
}

export default Footer