export default function SignupForm({ onToggle }) {
    return (
      <form className="auth-form">
        <label>Username</label>
        <input type="text" placeholder="Enter a username" />
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
        <label>Password</label>
        <input type="password" placeholder="••••••••" />
        <label className="error">Confirm Password</label>
        <input type="password" placeholder="••••••••" className="error" />
        <p className="error-message">enter same password in both fields</p>
        <button type="submit" className="submit-btn">Sign Up</button>
        <p>Already have an account? <a href="#" onClick={onToggle}>Login</a></p>
      </form>
    );
  }