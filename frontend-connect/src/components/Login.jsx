import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext
import '../Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setIsAuthenticated } = useContext(AuthContext); // ✅ Get setIsAuthenticated
  const navigate = useNavigate();

  const toggleView = () => {
    setIsLogin(!isLogin);
    setIsActive(!isActive);
    setError('');
    setUsername('');
    setPassword('');
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // **LOGIN LOGIC**
        const response = await axios.post('http://localhost:5000/log/login', { email, password });

        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userKey', 'true');

          setIsAuthenticated(true); // ✅ Update authentication state
          navigate('/home');
          window.location.reload();
        } else {
          setError('Login failed. Token missing.');
        }
      } else {
        // **REGISTRATION LOGIC**
        const user = { username, email, password,};

        const response = await axios.post('http://localhost:5000/log/register', user);

        if (response.data.message === 'User registered successfully!') {
          setUsername('');
          setPassword('');
          setEmail('');
          navigate('/login');
        } else {
          setError(response.data.message || 'Registration failed.');
        }
      }
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`}>
      <div className={`form-box ${isLogin ? 'login' : 'register'}`}>
        <form onSubmit={handleSubmit}>
          <h1>{isLogin ? 'Login' : 'Register'}</h1>

          {!isLogin && (
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>

          {error && <div className="error-message">{error}</div>}

          <p>or {isLogin ? 'login' : 'register'} with social platforms</p>

          <div className="social-icons">
            <a href="#"><i className="bx bxl-google"></i></a>
            <a href="#"><i className="bx bxl-facebook"></i></a>
            <a href="#"><i className="bx bxl-instagram"></i></a>
          </div>
        </form>
      </div>

      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn" onClick={toggleView}>
            Register
          </button>
        </div>

        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={toggleView}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
