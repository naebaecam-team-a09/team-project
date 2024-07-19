import { motion } from 'framer-motion';
import { PostsWithUserDataType } from '@/types/posts';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ id, likes, title, image_url, users: { username, profile_image_path } }: PostsWithUserDataType) => {
  return (
    <Link href={`/posts/${id}`}>
      <div className="border border-[#E7C891] relative aspect-[1/1.6] overflow-hidden rounded-xl">
        <div className="z-10 w-full h-60 absolute bottom-0 custom-post-card-info-bg text-white flex flex-col justify-end p-4 gap-4">
          <p className="text-lg font-semibold">♥︎ {likes}</p>
          <p className="text-3xl font-black">{title}</p>
          <div className="flex gap-2 items-center">
            <div className="relative w-12 h-12 overflow-hidden rounded-full ">
              <Image
                className="rounded-full"
                src={profile_image_path}
                alt={'프로필 이미지'}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <p className="text-xl font-bold">{username}</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-full h-full"
        >
          <Image
            src={image_url}
            alt={'코디 사진'}
            fill
            style={{
              objectFit: 'cover'
            }}
          />
        </motion.div>
      </div>
    </Link>
  );
};

export default Card;
