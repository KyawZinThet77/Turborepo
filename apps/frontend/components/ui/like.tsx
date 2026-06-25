'use client';

import { useState } from 'react';

interface LikeProps {
  userId?: number;
  postId: number;
}

export default function Like({ userId, postId }: LikeProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!userId) return alert('Please log in');

    // Toggle the UI state
    setLiked(!liked);

    // Send the data to your backend
    await fetch('/api/like', {
      method: 'POST',
      body: JSON.stringify({ postId, userId }),
    });
  };

  return (
    <button 
      onClick={handleLike}
      style={{ color: liked ? 'red' : 'black', cursor: 'pointer' }}
    >
      {liked ? '❤️ Liked' : '🤍 Like'}
    </button>
  );
}