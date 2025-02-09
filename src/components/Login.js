import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(''); // 错误信息
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 开始加载
    setError(''); // 清空错误信息
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
  } catch (error) {
    alert('登录失败，请检查用户名和密码');
    if (error.response) {
      console.error('服务器返回的错误:', error.response.data);
    } else {
      console.error('请求失败:', error.message);
    }
  } finally {
    setLoading(false); // 结束加载
  }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <a href="/register" className="register-link">注册</a>
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <h2>登录</h2>
        {error && <div className="error-message">{error}</div>} {/* 显示错误信息 */}
        <div className="form-group">
          <label>用户名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
        {loading ? '登录中...' : '登录'} {/* 根据加载状态显示不同文本 */}
        </button>
      </form>
    </div>
  );
};

export default Login;
