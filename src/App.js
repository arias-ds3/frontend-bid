import 'antd/dist/reset.css'

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
import { Layout, Menu, message, notification } from 'antd';


let App =() => {
  const [api, contextHolder] = notification.useNotification()

  let [login, setLogin] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    if ( localStorage.getItem("apiKey") != null){
      setLogin(true)
    } else {
      setLogin(false)
    }
  },[])

  let createNotification = (msg, type="info", placement="top") => {
    api[type]({
      message: msg,
      description: msg,
      placement
    })
  }

  let disconnect = async () => {
    await fetch (backendURL + "/users/disconnect?apiKey="+localStorage.getItem("apiKey"))

    localStorage.removeItem("apiKey")
    setLogin(false)
    navigate("/login")
  }
  let { Header, Content, Footer } = Layout

  return (
    <>
    {contextHolder}
    <Layout className='layaout' style={{ minHeight:'100vh'}}>
      <Header>
        { !login && (
               <Menu theme='dark' mode='horizontal' items={[
                { key: "menuRegister", label:<Link to="/register">Register</Link>},
                { key: "menuLogin", label:<Link to="/login">Login</Link>},
               ]}>

               </Menu>
        )}
        { login && (
            <Menu theme='dark' mode='horizontal' items={[
                { key: "menuCreateItem", label:<Link to="/createItem">Create Items</Link>},
                { key: "menuItems", label:<Link to="/items">items</Link>},
                { key: "menuMyItems", label:<Link to="/MyItems">My Items</Link>},
                { key: "menuDisconnect", label:<Link to="#"  onClick={disconnect}>Disconnect</Link>},
               ]}>

            </Menu>
        )}
      </Header>
      <Content style={{ padding: '20px 50px'}}>
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
      </Content>
      <Footer style={{ textAlign: 'center'}}>My website</Footer>
      </Layout>
      </>
  );
}

export default App;
