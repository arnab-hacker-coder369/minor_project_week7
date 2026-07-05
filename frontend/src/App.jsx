import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import API from './services/api';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [description, setDescription] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchFeed = async () => {
        try {
            const res = await API.get('/posts');
            setPosts(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchFeed(); }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        try {
            await API.post('/posts', { description });
            setDescription('');
            fetchFeed();
        } catch (err) { console.error(err); }
    };

    const handleLike = async (id) => {
        try {
            await API.put(`/posts/${id}/like`);
            fetchFeed();
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/posts/${id}`);
            fetchFeed();
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #eee' }}>
                <h3>Welcome, {user?.name}!</h3>
                <div>
                    <Link to="/profile" style={{ marginRight: '15px' }}>My Profile</Link>
                    <button onClick={handleLogout} style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none' }}>Logout</button>
                </div>
            </nav>

            <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                <textarea placeholder="Share something with the world..." required value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '10px', minHeight: '60px', fontSize: '15px' }} />
                <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Publish Post</button>
            </form>

            <h2>Recent Activity Feed</h2>
            {posts.map((post) => (
                <div key={post._id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '15px' }}>
                    <strong>{post.author?.name}</strong> 
                    <small style={{ color: '#888', marginLeft: '10px' }}>{new Date(post.createdAt).toLocaleDateString()}</small>
                    <p style={{ fontSize: '16px', margin: '10px 0' }}>{post.description}</p>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <button onClick={() => handleLike(post._id)} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>
                            👍 Like ({post.likes?.length || 0})
                        </button>
                        {user?.id === post.author?._id && (
                            <button onClick={() => handleDelete(post._id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const Profile = () => {
    const [bio, setBio] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (user?.bio) setBio(user.bio);
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await API.put('/auth/profile', { name: user.name, bio });
            localStorage.setItem('user', JSON.stringify({ ...user, bio: res.data.bio }));
            setUser({ ...user, bio: res.data.bio });
            setMsg('Profile Bio updated successfully!');
        } catch (err) { console.error(err); }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <Link to="/">⬅️ Back to Activity Feed</Link>
            <h2 style={{ marginTop: '20px' }}>Account Information</h2>
            {msg && <p style={{ color: 'green' }}>{msg}</p>}
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email Address:</strong> {user?.email}</p>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                <label><strong>Personal Bio:</strong></label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." style={{ padding: '10px', height: '60px' }} />
                <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Save Profile Changes</button>
            </form>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;