import { useState } from "react";
import { useLogin } from '../../hooks/useLogin';
import LoginForm from '../../components/Auth/LoginForm';

const Login = () => {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <LoginForm 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default Login;
