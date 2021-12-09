import React, { useEffect , useState } from 'react'
import axios from "axios";

import Loader from "../components/Loader";
import Error from '../components/Error';

import moment from "moment"

import StripeCheckout from 'react-stripe-checkout';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  duration:2000
});




function Bookingscreen({match}) {

    const[loading, setloading]= useState(true);
    const[error, seterror]= useState();
    const[room, setroom] = useState();
    

    const roomid = match.params.roomid

    const fromdate=moment(match.params.fromdate , 'DD-MM-YYYY')
    const todate=moment(match.params.todate,'DD-MM-YYYY')

    const totaldays = moment.duration(todate.diff(fromdate)).asDays()+1

    const[totalamount, settotalamount] = useState()
  
    
    

    
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
        
        try {
            setloading(true);

          const data = (await axios.post("/api/rooms/getroombyid", {roomid :match.params.roomid})).data;
          // get the objects- in an array using the roomid 
          console.log(data);
          settotalamount(data.rentperday * totaldays)
          setroom(data);
          setloading(false);
        } catch (error) {
            setloading(false);
            seterror(true);
        }
        
        
    }, [])


    // async function bookRoom(){

    //     const bookingDetails ={ 
    //         room,
    //         userid:JSON.parse(localStorage.getItem('currentUser'))._id,
    //         fromdate,
    //         todate,
    //         totalamount,
    //         totaldays
    //     }

    //     try {
    //         const result = await axios.post('/api/bookings/bookroom' , bookingDetails)
    //     } catch (error) {
            
    //     }

    // }

    async function onToken(token){
        console.log(token)

        const bookingDetails ={ 
            room,
            userid:JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }

        try {
            const result = await axios.post('/api/bookings/bookroom' , bookingDetails)
        } catch (error) {
            
        }

        
    }

    return (
        <div className="m-5" data-aos="flip-left">
            {/* <h1>Booking screen</h1>
            <h1>Room id = {match.params.roomid}</h1>
            checking for room id is coming or not */}
           {loading? (<Loader/>) : room ?  (<div>

                    <div className="row justify-content-center mt-5 bs" >

                            <div className="col-md-6">
                                    <h1>{room.name}</h1>
                                    <img src={room.imageurls[0]} className='bigimg'/>
                            </div>


                            <div className="col-md-6">

                                <div style={{textAlign:'right'}}>


                                                <h1> Booking Details</h1>
                                                <hr/>
                                                <p><b>Name</b> :{JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                        <p><b>From Date</b> : {match.params.fromdate}</p>
                                        <p><b>To Date</b> : {match.params.todate}</p>
                                        <p><b>Max Count </b>: {room.maxcount}</p>

                                
                                </div>


                                <div style={{textAlign:'right'}}>
                                            <h1><b>Amount</b></h1>
                                        <hr />
                                        <p>Total Days : {totaldays}</p>
                                        <p>Rent Per Day : {room.rentperday}</p>
                                        <h1><b>Total Amount :$ {totalamount}</b></h1>

                                </div>


                                <div style={{float:'right'}}>
                                    

                                    <StripeCheckout
                                    amount={totalamount * 100}
        token={onToken}
        currency='AUD'
        stripeKey="pk_test_51K4WUPG7p2ARKTxg9joDcj6u0jxgID4HQXnfFMjLlFBDlJTJLo3TlvjK0IOuHYVwgRmqANlDoTPa76RBWkvV5B2800BlUXIAPY"
      >
           <button className='btn btn-primary' >Pay Now{" "}</button>



          </StripeCheckout>
                                </div>


                            </div>    



                    </div>


           </div>) : (<Error/>)}

        </div>
    );

}

    

   
export default Bookingscreen;