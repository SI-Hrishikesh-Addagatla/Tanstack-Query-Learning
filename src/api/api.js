import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (pageNumber) => {
    try {
      const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
      return res.status === 200 ? res.data : [];
    } catch (error) {
      console.log(error);
    }
};
  
export const fetchInvPost = async (id) => {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.status === 200 ? res.data : [];
    } catch (error) {
      console.log(error);
    }
};
  
