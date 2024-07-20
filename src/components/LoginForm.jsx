export default function LoginForm({ onToggle }) {
    return (
      <form className="auth-form">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
        <label>Password</label>
        <input type="password" placeholder="••••••••" />
        <button type="submit" className="submit-btn">Log in</button>
        <p>Don't have an account? <a href="#" onClick={onToggle}>Register now</a></p>
      </form>
    );
  }