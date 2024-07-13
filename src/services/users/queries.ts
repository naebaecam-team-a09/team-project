import { User } from '@supabase/supabase-js';
import { getUserInfo } from './users.service';

export const usersQueryKeys = {
  all: ['user'] as const
};

export const queryOptions = {
  user: () => ({ queryKey: usersQueryKeys.all, queryFn: getUserInfo, select: (user: User) => user.id })
};
