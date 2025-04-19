import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../api/api';
export default function FetchOld(){
    const [posts,setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getPostsData = async () => {
        try{
            const data = await fetchPosts();
            setPosts(data || []); 
            setIsLoading(false);
        }
        catch(error){
            console.log(error);
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(()=> {
        getPostsData();
    },[]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div>
            <ul className='section-accordion'>
                {posts?.map((currElm)=> {
                    const {id,title,body} = currElm;
                    return (
                        <li key={id}>
                            <p>{title}</p>
                            <p>{body}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

