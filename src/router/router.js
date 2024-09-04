import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(()=>import('../home/Home'));
const Login = lazy(()=>import('../admin/Login'));
const About = lazy(()=>import('../home/About'));
const Register = lazy(()=>import('../admin/Register'));
const Contact = lazy(()=>import('../home/Contact'));
const ViewMovies = lazy(()=>import('../home/ViewMovies'));
const ManageMovies = lazy(()=>import('../home/ManageMovies'));
const BuyTicket = lazy(()=>import('../home/BuyTicket'));
function AppRouter() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} >
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/viewMovies" element={<ViewMovies />} />
                <Route path="/ManageMovies" element={<ManageMovies />} />
                <Route path="/buyticket" element={<BuyTicket />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>    
            </Suspense>
        </Router>
    );
}
export default AppRouter;