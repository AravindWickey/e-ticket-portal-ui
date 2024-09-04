import React, { useState } from 'react'
import { input, label, small, button, form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  )
  .required('Password is required'),
});


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      console.log(response.data, "LoginPage data");
      localStorage.setItem('token', response.data.access_token);
      alert('Login successful!');
      navigate('/about');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('There was an error logging in!', error);
      }
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Row className="w-100">
          <Col md={6} className="mx-auto">
            <form className="p-4 border border" style={{ borderRadius: '0' }} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <button type="submit" class="btn btn-custom mt-3">Login</button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Login;