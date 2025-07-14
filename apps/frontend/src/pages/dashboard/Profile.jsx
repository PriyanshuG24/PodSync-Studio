import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/authServices';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="p-4">Loading user data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{user.name || 'User'}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-medium mb-2">User Details:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
