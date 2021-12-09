import React, { useState, useEffect } from 'react'

import axios from "axios";

import Room from "../components/Room";
import Loader from "../components/Loader";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Error from '../components/Error';
import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import { DatePicker, Space } from 'antd';


import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  duration: 1000
});


const { RangePicker } = DatePicker;




function Homescreen() {

  const[rooms, setrooms] = useState([])
  const[loading, setloading]= useState()
  // eslint-disable-next-line no-unused-vars
  const[error, seterror]= useState()
  const[fromdate, setfromdate] = useState()
  const[todate, settodate] = useState()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {

        try {
          setloading(true);

          const data =  (await axios.get("https://lit-atoll-22624.herokuapp.com/api/rooms/getallrooms")).data;
          // get the objects- in an array
          console.log(data);
          setrooms(data);
          setloading(false);


        } catch (error) {
          seterror(true);

          console.log(error);
          setloading(false);


        }
      }, []);


      function filterByDate(dates){
              console.log(moment(dates[0]).format('DD-MM-YYY'))
              console.log(moment(dates[1]).format('DD-MM-YYY'))

              setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
              settodate(moment(dates[1]).format('DD-MM-YYYY'))
      }
    return (
        <div className='container'>

          <div className="row mt-5 bs">
                  <div className="col-md-3">
                  <RangePicker  format='DD-MM-YYY' onChange={filterByDate} />

                  </div>
            

          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="search-room" />
          </div>

          

        <div className="col-md-3">
        <select className="form-control">

            <option value="all">All</option>
                <option value="delux">Lux</option>
                <option value="non-delux">Non-Lux</option>

              </select>
        </div>
          
            </div>
            
          <div className = "row justify-content-center mt-5">
          {loading ? (
          <Loader/>
          ) : rooms.length>1 ? (
            rooms.map((room) => {
              return <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate}/>
  
                </div>;
            })
            ) : (
             <Error/>
          )}
          </div>
            
        </div>
    );
}

export default Homescreen;
