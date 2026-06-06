import { useState } from 'react';

export const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      Like ({likes})
    </button>
  );
};
