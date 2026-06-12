import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import the decoder
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold text-primary fs-4">
            Drelix<span className="text-white">Blog</span>
          </Link>
          
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="nav-link text-white-50 small">Home</Link>
            {token ? (
              <>
                {/* Visual Indicator: Displays the logged-in user's name */}
                <span className="text-white-50 small me-2">
                  Logged in as: <strong className="text-primary">@{username}</strong>
                </span>
                <Link to="/create" className="btn btn-primary btn-sm px-3 fw-semibold">Create Post</Link>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm px-3">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-white-50 small">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm px-3 fw-semibold">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;