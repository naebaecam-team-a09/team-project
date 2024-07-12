import { PostType } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const usePosts = () => useQuery<PostType[]>(queryOptions.all());

export const usePostsWithUserInfo = () => useQuery(queryOptions.allWithUserInfo());
