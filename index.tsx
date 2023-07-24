import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';
import Register from '../components/Register';
import Login from '../components/Login';
import UserProfile from '../components/UserProfile';
import BlogDetails from '../components/BlogDetails';

interface Blog {
  _id: string;
  heading: string;
  body: string;
  postedDate: string;
  author: string;
}

interface User {
  username: string;
  email: string;
  profilePicture: string;
}

interface BlogData {
  heading: string;
  body: string;
  postedDate: string;
  author: string;
}

// Create a new type for the authentication response from the server
interface AuthResponse {
    token: string;
    user: User;
  }

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

  useEffect(() => {
    // Fetch all blogs on initial load
    fetchBlogs();
    // checkLoggedInUser();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<Blog[]>('http://localhost:5000/api/blogs/getBlogs');
        setBlogs(response.data);
        console.log(response.data);
    } catch (error) {
      console.log('Error fetching blogs:', error);
    }
  };

//   const checkLoggedInUser = async () => {
//     try {
//       const response = await axios.get<User>('/api/users/user');
//       setUser(response.data);
//     } catch (error) {
//       console.log('User not logged in');
//     }
//   };

const handleCreateBlog = async (blogData: BlogData) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        return console.log('Authentication required. Please log in.');
      }
  
      await axios.post('http://localhost:5000/api/blogs/create', blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      fetchBlogs();
    } catch (error) {
      console.log('Error creating blog:', error);
    }
  };
  

const handleEditBlog = async (id: string, blogData: BlogData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      return console.log('Authentication required. Please log in.');
    }

    await axios.put(`http://localhost:5000/api/blogs/update/${id}`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBlogs();
  } catch (error) {
    console.log('Error editing blog:', error);
  }
};


const handleDeleteBlog = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        return console.log('Authentication required. Please log in.');
      }
  
      await axios.delete(`http://localhost:5000/api/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      fetchBlogs();
    } catch (error) {
      console.log('Error deleting blog:', error);
    }
  };
  

  const handleLogin = async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post<AuthResponse>('http://localhost:5000/api/users/login', userData);
        setUser(response.data.user);
        console.log(response.data);
  
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };
  

  const handleRegister = async (userData: {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
  }) => {
    try {
      const response = await axios.post<User>('http://localhost:5000/api/users/register', userData);
      setUser(response.data);
    //   navigate('/');
    } catch (error) {
      console.log('Error registering:', error);
    }
  };

//   const handleLogout = async () => {
//     try {
//       await axios.post('/api/users/logout');
//       setUser(null);
//       navigate('/');
//     } catch (error) {
//       console.log('Error logging out:', error);
//     }
//   };

  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">CRUD Blog App</Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">Create Blog</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                </li> */}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} onDelete={handleDeleteBlog} />} />
          <Route path="/create" element={<BlogForm onSubmit={handleCreateBlog} />} />
          <Route path="/edit/:id" element={<BlogForm onEditSubmit={handleEditBlog} />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/profile" element={user ? <UserProfile user={user} /> : <p>Please login to view profile.</p>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
