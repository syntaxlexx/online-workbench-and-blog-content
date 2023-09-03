import qs from 'query-string'

import { useSocket } from '@/components/providers/socket-provider'
import { useInfiniteQuery } from '@tanstack/react-query'

interface ChatQueryProps {
    queryKey: string,
    apiUrl: string,
    paramKey: "channelId" | "conversationId",
    paramValue: string,
}

export const useChatQuery = ({
    apiUrl, paramKey, paramValue, queryKey,
}: ChatQueryProps) => {
    const { isConnected } = useSocket()

    const fetchMessages = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue,
            }
        }, {
            skipNull: true
        })

        const resp = await fetch(url)
        return resp.json()
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000, // only run when our socket server fails
        // refetchInterval: 1000,
    })

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }

}
