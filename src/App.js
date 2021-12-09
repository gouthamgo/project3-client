import './App.css';
import Navbar from './components/Navbar';

import {BrowserRouter, Route } from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Landingscreen from './screens/Landingscreen';




function App() {
  return (
    <div className="App">
    <Navbar/>

    <BrowserRouter>
        <Route path='/' exact component={Landingscreen}/>
        <Route path="/home" exact component={Homescreen}/>
        <Route path='/book/:roomid/:fromdate/:todate' exact component={Bookingscreen}/>
        <Route path= '/register' exact component={Registerscreen}/>
        <Route path='/login' exact component={Loginscreen}/>
       

      </BrowserRouter>
    </div>
  );
}

export default App;
