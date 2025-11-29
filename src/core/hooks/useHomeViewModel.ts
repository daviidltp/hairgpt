import { useQuery } from '@tanstack/react-query';
import { scriptRepository } from '@/di/container';

export function useHomeViewModel() {
    const { data: scripts, isLoading, error } = useQuery({
        queryKey: ['scripts'],
        queryFn: () => scriptRepository.getAll(),
    });

    return {
        scripts,
        isLoading,
        error,
    };
}
