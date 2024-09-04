import React,{useState} from 'react'
import { input, label, small, button, form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  secret: Yup.string().required('Secret is required'),
});

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecrete] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ email, password, secret }, { abortEarly: false });
      const response = await axios.post('http://localhost:3000/auth/register', {
        username: email,
        password: password,
        secret : secret
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      alert('Registration Failed');
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
              <div className="form-group">
                <label htmlFor="password">Secret Key</label>
                <input
                  type="password"
                  className={`form-control ${errors.secret ? 'is-invalid' : ''}`}
                  id="password"
                  value={secret}
                  onChange={(e) => setSecrete(e.target.value)}
                />
                {errors.secret && <div className="invalid-feedback">{errors.secret}</div>}
              </div>  
              <button type="submit" class="btn btn-custom mt-3">Register</button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Login;