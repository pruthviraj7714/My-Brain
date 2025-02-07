import axios from "axios"

export const fetchContent = async () => {
    const { data } = await axios.get('/api/content/all');
    return data;
}

export const fetchBrain = async (userId : string) => {
    const { data } = await axios.get(`/api/brain/${userId}`);
    return data;
}