import React from 'react';

interface User {
  username: string;
  email: string;
  profilePicture: string;
}

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h3>Welcome, {user.username}!</h3>
      <p>Email: {user.email}</p>
      <img src={user.profilePicture} alt="Profile" />
    </div>
  );
};

export default UserProfile;
