import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('inspector');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, phone, username, password, role });
      alert('注册成功，请登录');
      navigate('/login');
    } catch (error) {
      alert('注册失败，请检查输入信息');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>注册</h2>
        <div className="form-group">
          <label>姓名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>手机号</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>角色</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="inspector">巡检员</option>
            <option value="repairer">维修员</option>
            <option value="admin">管理员</option>
          </select>
        </div>
        <button type="submit" className="register-button">注册</button>
      </form>
    </div>
  );
};

export default Register;
