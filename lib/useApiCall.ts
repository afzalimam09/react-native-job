import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useApiCall = (fn: (page: number) => Promise<any>) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchData = async (pageNumber: number) => {
        setLoading(true);
        try {
            const res: any = await fn(pageNumber);
            if (res.results && res.results.length > 0) {
                setData(prevData => [...prevData, ...res.results]);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, []);

    const loadMore = () => {
        if (hasMore && !loading) {
            fetchData(page);
        }
    };

    const refetch = () => {
        setData([]);
        setPage(1);
        setHasMore(true);
        fetchData(1);
    };

    return { data, loading, refetch, loadMore, hasMore };
};

export default useApiCall;
