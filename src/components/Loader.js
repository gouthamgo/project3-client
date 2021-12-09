import React,{useState} from 'react'
import HashLoader from "react-spinners/HashLoader";


function Loader() {

    // eslint-disable-next-line no-unused-vars
    let [loading, setloading] = useState(true);
  
    return (
        <div style={{marginTop:'150px'}}>
            <div className="sweet-loading text-center">
            

      <HashLoader color='#000' loading={loading} css=''size={90} />
         </div>
        </div>
    )
}

export default Loader
