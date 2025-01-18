import axios from "axios"

export const fetchContent = async () => {
    const { data } = await axios.get('/api/content/all');
    return data;
}