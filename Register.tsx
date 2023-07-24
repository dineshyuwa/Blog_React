import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface RegisterProps {
  onRegister: (userData: {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
  }) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({ username, email, password, profilePicture });
    setUsername('');
    setEmail('');
    setPassword('');
    setProfilePicture('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="profilePicture">
        <Form.Label>Profile Picture URL</Form.Label>
        <Form.Control
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
