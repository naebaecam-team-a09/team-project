import Image from 'next/image';

interface TComment {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  contents: string;
  users: {
    profile_image_path: string;
    username: string;
  };
}

const Comment = ({ contents, users: { profile_image_path, username } }: TComment) => {
  return (
    <div className="shadow-md rounded-xl flex flex-col justify-between px-5 py-10 w-[320px] h-[220px]">
      <p className="text-[#575c6f]">{contents}</p>
      <div className="flex items-center gap-2">
        <div className="relative rounded-full overflow-hidden">
          <Image src={profile_image_path} alt="" width={40} height={40} />
        </div>
        <p className="text-lg font-medium text-[#575c6f]">{username}</p>
      </div>
    </div>
  );
};

export default Comment;
