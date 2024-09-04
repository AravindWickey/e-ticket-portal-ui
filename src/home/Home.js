import React,{useState} from "react";
import logo from "../asset/nms-logo.png";
import { Link, Route, Switch, Outlet } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function Home() {
  const [auth, setAuth] = React.useState(!!localStorage.getItem('token'));
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    localStorage.removeItem('token');
    setAuth(false);
    setAnchorEl(null);
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid" style={{ fontFamily: 'Cyberpunk' }}>
          <a class="navbar-brand" href="#">
            <img src={logo} alt="NMS Cinemas" width="128" height="74" class="d-inline-block align-text-top" />
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className="nav-link active" to="/about">ABOUT</Link>
              </li>
              <li class="nav-item">
              <Link className="nav-link active" to="/contact">CONTACT</Link>
              </li>
              <li class="nav-item dropdown">
                {/* <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  View Movies
                </a> */}
                <li class="nav-item">
                <Link className="nav-link active" to="/viewMovies">VIEW MOVIES</Link>
                </li>
              </li>
              {auth && (
              <li className="nav-item">
               <Link className="nav-link active" to="/ManageMovies">MANAGE MOVIES</Link>
              </li>
                )}
            </ul>
            {/* <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form> */}
           {!auth && (<>
            <button type="button" class="btn btn-custom me-3" data-toggle="button" aria-pressed="false" autocomplete="off">
                <Link className="nav-link active" to="/login">LOGIN</Link>
            </button>
            <button type="button" class="btn btn-custom" data-toggle="button" aria-pressed="false" autocomplete="off">
            <Link className="nav-link active" to="/register">Register</Link>
            </button>
           </>)
           } 
            {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={handleClose}>LOGOUT</MenuItem>
              </Menu>
            </div>
          )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
} export default Home;