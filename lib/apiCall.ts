import axios from 'axios';

export async function getJobs(page = 1) {
    try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}