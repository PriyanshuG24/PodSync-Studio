import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../../components/Auth/SignupForm';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, loading, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name,email, password);
    if (success) {
      navigate('/'); // Redirect to home page after successful signup
    }
  };

  return (
    <SignupForm 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      name={name}
      setName={setName}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default Signup;