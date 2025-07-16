const PrePermissionSessionWindow = ({ onJoin }) => {
    const handleJoinClick = () => {
      // Here you can request mic/cam permissions, do checks, etc.
      // After that, call onJoin
      onJoin();
    };
  
    return (
      <div className="p-6">
        <h2>🎙️ Check your camera and mic</h2>
        {/* mic/cam preview here */}
        <button onClick={handleJoinClick} className="btn btn-primary mt-4">
          Join Studio
        </button>
      </div>
    );
};

export default PrePermissionSessionWindow;