import React from 'react'
import { Link } from 'react-router-dom'



function Landingscreen() {
    return (
        <>
        <div class="container-front">

    

    <div class="hotel_content">

      <div class="info">
        <h3>Crazy Pods - Book Hotel Rooms</h3>
        
      </div>


     </div>

    <img src={"images/hotel.png"} className="hotel" alt="hotel"/>
    <img src="images/car1.png" className="car1" alt="hotel"/>
    <img src="images/car2.png" className="car2" alt="hotel"/>
    <img src="images/car3.png" className="car3" alt="hotel"/>
    <img src="images/car4.png" className="car4" alt="hotel"/>
    <img src="images/dog.gif" className="dog_1" alt="hotel"/>
    

  </div>
  
  <div class="wrap">
<Link to="/home">
<button className='but'>Book Now</button>
</Link>
</div> 



</>
    )
}

export default Landingscreen
