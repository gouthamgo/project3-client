import React, {useState} from 'react'
import {Modal, Button, Carousel} from  'react-bootstrap'
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  duration:1000
});

function Room({room, fromdate, todate}) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        <div className="row bs" data-aos='fade-up' > 
        <div className="col-md-4">
            <img src={room.imageurls[0]} className="smalling" alt="small" />
            </div>
            <div className="col-md-7" >
            <h1>{room.name}</h1>
       <b>
        <p>
          <b>Max Count : {room.maxcount}</b>
        </p>
        <p>
          <b>Phonenumber : </b>
          {room.phonenumber}
        </p>
        <p>
          <b>cost : ${room.rentperday}</b>
        </p>
        </b>

        

        <div style={{ float: "right" }}>
        <Link to={`/book/${room._id}/${fromdate}/${todate}`} >
            <button className="btn btn-primary m-2">Book Now</button>
          </Link>
            <button className="btn btn-primary" onClick={handleShow}>View Details</button>
        </div>
    </div>


      <Modal show={show} onHide={handleClose} size='lg'>
        
          <Modal.Title>{room.name}</Modal.Title>
       
        <Modal.Body>

            <Carousel prevLabel ='' nextLabel=''>
  
      {room.imageurls.map(url =>{
          return <Carousel.Item>
          <img
            className="d-block w-100 bigimg"
            src={url}
            alt=" slide"
          />
      
          
        </Carousel.Item>
      })}

</Carousel>
<p>{room.description}</p>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>

        </div>
    )
}

export default Room
