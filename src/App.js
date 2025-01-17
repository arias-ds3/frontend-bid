
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import CreateUserComponent from './Components/CreateUserComponent';
import LoginUserComponent from './Components/LoginUserComponent';

let App =() => {

  return (
    <div className="main-container">
      <nav>
        <ul className='navbar'>
            <li><Link to="/">Index</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/Login">Login</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/register' element={
          <CreateUserComponent/>
          } />
        <Route path='/Login' element={
          <LoginUserComponent/>
          } />
          <Route path='/' element={
          <p>Index of website</p>
          } />
      </Routes>

    </div>
  );
}

export default App;
