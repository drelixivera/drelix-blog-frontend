import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import the decoder
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Footer from './components/Footer';

function App() {
  const token = localStorage.getItem('token');
  let username = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Your Decoded Token Payload:", decoded);
      username = decoded.user?.username || decoded.username || decoded.user?.email || "User"; 
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem('token');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      {/* 🌟 MASTER CANVAS: Gradient covers the entire page viewport fluidly */}
      <div className="d-flex flex-column min-vh-100" 
           style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
        
        {/* NAVBAR */}
        
<nav className="navbar navbar-expand-lg navbar-dark sticky-top border-bottom border-secondary border-opacity-25" 
     style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', zIndex: 1030 }}>
  <div className="container">
    <Link to="/" className="navbar-brand fw-bold fs-4" style={{ letterSpacing: '-0.5px' }}>
      <span style={{ color: '#38bdf8' }}>Drelix</span><span className="text-white">Blog</span>
    </Link>
    
    {/* MOBILE COMPONENT HAMBURGER CONTROLLER */}
    <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#appNavbar" aria-controls="appNavbar" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    {/* COLLAPSIBLE DATA LINKS ELEMENT CONTAINER */}
    <div className="collapse navbar-collapse" id="appNavbar">
      <ul className="navbar-nav ms-auto align-items-lg-center gap-3 mt-3 mt-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light text-opacity-75 small fw-medium px-2 hover-sky" 
                style={{ transition: 'color 0.2s' }}>
            Home
          </Link>
        </li>
        {token ? (
          <>
            <li className="nav-item">
              <span className="text-light text-opacity-50 small d-block py-1">
                Logged in as: <strong style={{ color: '#38bdf8' }}>@{username}</strong>
              </span>
            </li>
            <li className="nav-item">
              <Link to="/create" className="btn btn-sm px-3 fw-bold text-white w-100 text-center" 
                    style={{ background: 'linear-gradient(45deg, #4f46e5, #6366f1)', border: 'none' }}>
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-sm btn-outline-danger px-3 fw-semibold w-100 text-center"
                      style={{ borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-light text-opacity-75 small fw-medium px-2 hover-sky">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="btn btn-sm px-3 fw-bold text-white w-100 text-center"
                    style={{ background: 'linear-gradient(45deg, #4f46e5, #6366f1)', border: 'none' }}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

        {/* 🌟 ROUTING MAIN BODY CONTENT: flex-grow-1 pushes footer to bottom */}
        <div className="flex-grow-1 d-flex flex-column">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;