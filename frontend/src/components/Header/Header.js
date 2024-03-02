import React from 'react';
// import "./css/test.css";
import "./css/Header.css";
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import varta from '../../assets/varta.png'
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

export let result
function Header() {
  const user = useSelector(selectUser)
  const history = useHistory()
  const serachHandle = async(event) => {
    let key = event.target.value;
    if(key){
      localStorage.setItem("search")
      console.log(key)
    }
  }
  
  return (
    <header>
      <div className='header-container'>
        <div className='header-left'>
          <Link to="/"><img src={varta} alt='logo' className='logo-left' /></Link>
          <h3>Products</h3>
        </div>
        <div className='header-middle'>
          <div className='header-search-container'>
            <SearchIcon />
            <input type='text' placeholder='Search...' onChange={serachHandle} />
          </div>
        </div>
        <div className='header-right'>
          <div className='header-right-container'>
            <span onClick={() => {
              const auth = getAuth();
              signOut(auth).then(() => {
                // Sign-out successful.
                history.push('/auth')
              }).catch((error) => {
                // An error happened.
              });
            }}><Avatar src={user?.photo} /></span>
            <InboxIcon />
            <svg
              aria-hidden="true"
              className="svg-icon iconStackExchange"
              width="24"
              height="24"
              viewBox="0 0 18 18"
              fill="rgba(238, 238, 238)"
              style={{
                cursor: "pointer",
              }}
            >
              <path d="M15 1H3a2 2 0 00-2 2v2h16V3a2 2 0 00-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 002-2v-2H1v2Zm16-7H1v4h16V6Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header