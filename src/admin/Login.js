import React,{useState} from 'react'
import { input, label, small, button, form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      console.log(response.data,"LoginPage data");
      localStorage.setItem('token', response.data.access_token);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Row className="w-100">
          <Col md={6} className="mx-auto">
            <form className="p-4 border border" style={{ borderRadius: '0' }} onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ borderRadius: '0' }} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" style={{ borderRadius: '0' }} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-custom">Login</button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Login;