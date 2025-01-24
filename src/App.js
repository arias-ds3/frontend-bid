
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { backendURL } from './Globals';

import CreateUserComponent from './Components/CreateUserComponent';
import LoginUserComponent from './Components/LoginUserComponent';
import ItemsComponent from './Components/ItemsComponent';
import CreateItemComponent from './Components/CreateItemsComponent';
import MyItemsComponent from './Components/MyItemsComponent';
import DetailsItemComponent from './Components/DetailsItemComponent';
import EditItemComponent from './Components/EditItemComponent';
import ListBidsComponent from './Components/ListBidsComponent';



let App =() => {
  let [notification, setNotification] = useState("");
  let [login, setLogin] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    if ( localStorage.getItem("apiKey") != null){
      setLogin(true)
    } else {
      setLogin(false)
    }
  },[])



  let createNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification("");
    }, 3000)
  }

  let disconnect = async () => {
    await fetch (backendURL + "/users/disconnect?apiKey="+localStorage.getItem("apiKey"))

    localStorage.removeItem("apiKey")
    setLogin(false)
    navigate("/login")
  }

  return (
    <div className="main-container">
      <nav>
        <ul className='navbar'>
            <li><Link to="/">Index</Link></li>
            { !login && <li><Link to="/register">Register</Link></li>}
            { !login && <li><Link to="/Login">Login</Link></li>}
            { login && <li><Link to="/items">Items</Link></li>}
            { login && <li><Link to="#" onClick={disconnect}>Disconnect</Link></li>}
            { login && <li><Link to="/createItem">Create items</Link></li>}
            { login && <li><Link to="/MyItems">My Items</Link></li>}
        </ul>
      </nav>

      { notification != "" && (
        <div className='notification'>
          { notification }
          <span className='close-btn' onClick={() => { setNotification("")} }>X</span>
        </div>
      )}

      <Routes>
        <Route path='/register' element={
          <CreateUserComponent createNotification={createNotification} />
          } />
        <Route path='/Login' element={
          <LoginUserComponent setLogin={setLogin} />
          } />
          <Route path='/' element={
          <p>Index of website</p>
          } />
            <Route path='/items' element={
              <ItemsComponent/>
          } />
          <Route path='/createItem' element={
              <CreateItemComponent createNotification={createNotification}/>
          } />
          <Route path='/MyItems' element={
              <MyItemsComponent createNotification={createNotification}/>
          } />
           <Route path='/item/:itemId' element={
              <DetailsItemComponent createNotification={createNotification}/>
          } />
           <Route path='/item/edit/:itemId' element={
              <EditItemComponent/>
          } />
            <Route path='/item/:itemId/bids' element={
              <ListBidsComponent/>
          } />
      </Routes>

    </div>
  );
}

export default App;
