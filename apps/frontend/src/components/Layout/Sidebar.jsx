import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">PodSync Studio</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/studio">Studio</Link>
        <Link to="/dashboard/projects">Projects</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/profile">Profile</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
