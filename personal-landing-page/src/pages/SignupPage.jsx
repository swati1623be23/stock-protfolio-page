// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signup } from "../services/api";

// const SignupPage = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const result = await signup(form.name, form.email, form.password);

//     if (result.success) {
//       alert("Signup Successful!");
//       navigate("/login");
//     } else {
//       setError(result.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSignup}>
//         <input name="name" placeholder="Name" onChange={handleChange} required />
//         <br />
//         <input name="email" placeholder="Email" onChange={handleChange} required />
//         <br />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <br />
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Signing up...' : 'Signup'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;


import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../services/api'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = await signup(name, email, password)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message || 'Signup failed')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Create Account ✨</h1>
        <p>Sign up to get started</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage