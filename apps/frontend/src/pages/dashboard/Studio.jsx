import { useState } from 'react';
import PrePermissionSessionWindow from '../../components/Studio/PrePermissionSessionWindow';
import StudioSessionWindow from '../../components/Studio/StudioSessionWindow';

const Studio = () => {
  const [joined, setJoined] = useState(false);

  return (
    <div className="w-full h-full">
      {!joined ? (
        <PrePermissionSessionWindow onJoin={() => setJoined(true)} />
      ) : (
        <StudioSessionWindow />
      )}
    </div>
  );
};

export default Studio;
