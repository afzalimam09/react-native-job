// utils/bookmarkUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = 'bookmarked_jobs';

export const saveBookmark = async (job: any) => {
    try {
        const bookmarks = await getBookmarks();
        if (!bookmarks.find((item: any) => item.id === job.id)) {
            bookmarks.push(job);
            await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
        }
    } catch (error) {
        console.error('Error saving bookmark:', error);
    }
};

export const removeBookmark = async (jobId: any) => {
    try {
        let bookmarks = await getBookmarks();
        bookmarks = bookmarks.filter((item: any) => item.id !== jobId);
        await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Error removing bookmark:', error);
    }
};

export const getBookmarks = async () => {
    try {
        const bookmarks = await AsyncStorage.getItem(BOOKMARK_KEY);
        return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
        console.error('Error retrieving bookmarks:', error);
        return [];
    }
};

export const getBookmarkedJobById = async (jobId: number) => {
    try {
        const bookmarks = await getBookmarks();
        const job = bookmarks.find((job: any) => job.id === jobId);
        return job || null;
    } catch (error) {
        console.error('Error retrieving bookmarked job:', error);
        return null;
    }
};

export const isBookmarked = async (jobId: number): Promise<boolean> => {
    try {
        const bookmarks = await getBookmarks();
        return bookmarks.some((job: any) => job.id === jobId);
    } catch (error) {
        console.error('Error checking if bookmarked:', error);
        return false;
    }
};
