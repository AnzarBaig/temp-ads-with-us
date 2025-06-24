// import { useQuery } from 'react-query';
import { useQuery } from '@tanstack/react-query';

const useCategoryData = (queryKey, fetchFunction, options = {}) => {
    const { data, isLoading, isError, error, isFetching } = useQuery(
        queryKey,
        fetchFunction,
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 5 * 60 * 1000,
            ...options,
        }
    );

    return { data, isLoading, isError, error, isFetching };
};

export default useCategoryData;
