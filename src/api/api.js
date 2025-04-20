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


export const deletePost = async (id) => {
    return api.delete(`/posts/${id}`);
}
  

export const updatePost = async (id) => {
    return api.patch(`/posts/${id}`,{title:"I have updated"});
}
  
// inifnite scrolling
export const fetchUsers = async ({ pageParam }) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users?per_page=10&page=${pageParam}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
};