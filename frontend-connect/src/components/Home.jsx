import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Home.css';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      let value = window.scrollY;
      document.getElementById('text').style.marginTop = value * 1 + 'px';
      document.getElementById('leaf').style.top = value * -1.5 + 'px';
      document.getElementById('leaf').style.left = value * 1.5 + 'px';
      document.getElementById('hill5').style.left = value * 1.5 + 'px';
      document.getElementById('hill4').style.left = value * -1.5 + 'px';
      document.getElementById('hill1').style.top = value * 0.55 + 'px';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userKey, setUserKey] = useState(null);
  const navigate = useNavigate();
  

  
    const token = localStorage.getItem("authToken");
    let userRole=null;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
         userRole=decodedToken.role;
        // setRole(decodedToken.role || null);
      } catch (error) {
        console.log("Invalid Token", error);
      }
    }
    useEffect(()=>{
    const authToken = localStorage.getItem('authToken');
    const key = localStorage.getItem('userKey');

    setIsLoggedIn(!!authToken);
    setUserKey(key ? key : "false");
  },[])

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.setItem('userKey', "false");

    setIsLoggedIn(false);
    setUserKey("false");
    // setRole(null);

    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 200);
  };

  return (
    <>
      <header>
        <h2 className="logo">KERALAM</h2>
        <nav className="navigation">
          <a href="#" className="active">Home</a>
          <a href="/Districts">District</a>

          {userRole == "admin" && (
            <a href="/Adminpanel">Add</a>
          )}

          {!isLoggedIn ? (
            <Link to="/login">Login</Link> 
          ) : (
            <Link onClick={handleLogout}>Logout</Link>
          )}
        </nav>
      </header>

      <section className="parallax">
        <img src="/images/hill1.png" className="hill" id="hill1" />
        <img src="/images/hill2.png" className="hill" />
        <img src="/images/hill3.png" className="hill" />
        <img src="/images/hill4.png" className="hill" id="hill4" />
        <img src="/images/hill5.png" className="hill" id="hill5" />
        <img src="/images/tree.png" className="tree" />
        <h2 className="parallax-text" id="text">God's Own Country </h2>
        <img src="/images/leaf.png" className="leaf" id="leaf" />
        <img src="/images/plant.png" className="plant" />
      </section>

      <section className="sec">
        <h2>About</h2>
        <p>
          Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. 
          It's known for its palm-lined beaches and backwaters, a network of canals. 
          Inland are the Western Ghats, mountains whose slopes support tea, coffee and spice plantations as well as wildlife.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section about">
            <h2>About Us</h2>
            <p>Discover Kerala, its vibrant culture, and breathtaking landscapes.</p>
          </div>

          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Districts">Districts</Link></li>
              
            </ul>
          </div>

          <div className="footer-section contact">
            <h2>Contact</h2>
            <p>Email: noelnaveen@gmail.com</p>
            <p>Phone: +91 9400650050</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Kerala Tourism. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
