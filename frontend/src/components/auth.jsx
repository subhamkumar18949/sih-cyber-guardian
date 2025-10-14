import React, { useState } from 'react';

// Main component for the Authentication Page
const AuthPage = () => {
    // State to toggle between Login and Sign Up forms
    const [isLogin, setIsLogin] = useState(true);

    // Function to switch forms
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    // Inline CSS styles for the component
    const styles = {
        // Main container that fills the viewport
        body: {
            fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
           
            padding: '20px',
        },
        // The main box for the form
        container: {
            maxWidth: '400px',
            width: '100%',
            background: 'rgba(51, 59, 87, 0.1)', // Bluish-transparent background
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)', // Frosted glass effect
            border: '1px solid rgba(101, 108, 131, 0.3)',
            color: '#fff',
        },
        // Form title styling
        title: {
            fontSize: '2.2em',
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        // Input field styling
        input: {
            width: '100%',
            padding: '12px 15px',
            margin: '10px 0',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            fontSize: '1em',
            outline: 'none',
        },
        // Button styling
        button: {
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            background: '#fff',
            color: '#3498db',
            fontSize: '1.1em',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '15px',
            transition: 'background 0.3s, color 0.3s',
        },
        // Helper text to switch between forms
        toggleText: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '0.9em',
        },
        // Link styling within the helper text
        toggleLink: {
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'underline',
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                {/* The title changes based on whether it's login or sign up */}
                <h1 style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <form>
                    {/* Extra fields for Sign Up form */}
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            style={styles.input}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        style={styles.input}
                    />
                    {!isLogin && (
                         <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            style={styles.input}
                        />
                    )}
                    <button type="submit" style={styles.button}>
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>
                <p style={styles.toggleText}>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <span onClick={toggleForm} style={styles.toggleLink}>
                        {isLogin ? ' Sign Up' : ' Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;