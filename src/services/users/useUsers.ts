import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const useGetUser = () => useQuery(queryOptions.user());
