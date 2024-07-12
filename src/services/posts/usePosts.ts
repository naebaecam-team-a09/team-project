import { useQuery } from '@tanstack/react-query';
import { getPosts } from './posts.service';

export const usePosts = () =>
  useQuery({
    queryKey: ['posts', 'all'],
    queryFn: getPosts
  });
