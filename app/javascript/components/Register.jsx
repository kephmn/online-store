    import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ 
        first_name: "", last_name: "", email: "", password: "", password_confirmation: ""});
        const [error, setError] = useState("");
    const { user, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match");
            return;
        }
        try {
            await register(formData);
            navigate("/login"); // Redirect to login page after successful registration
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
                    </div>
                    {error && <div className="text-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;