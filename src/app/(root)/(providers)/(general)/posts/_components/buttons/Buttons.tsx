'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import PostDeleteButton from './PostDeleteButton';
import PostEditButton from './PostEditButton';

const Buttons = ({ ownerId, postId }: { ownerId: string; postId: string }) => {
  const { me } = useAuth();
  const userId = me?.id;
  const isOwner = userId === ownerId;

  return (
    <>
      {isOwner && (
        <div className="flex justify-end space-x-2 mt-4">
          <PostEditButton postId={postId} />
          <PostDeleteButton postId={postId} />
        </div>
      )}
    </>
  );
};
export default Buttons;
