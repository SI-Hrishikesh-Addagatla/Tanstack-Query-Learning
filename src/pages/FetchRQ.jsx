import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, fetchPosts } from '../api/api';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function FetchRQ(){

    const [pageNumber, setPageNumber] = useState(0);
    const queryClient = useQueryClient();

    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['posts',pageNumber], 
        queryFn: () => fetchPosts(pageNumber), 
        placeholderData: keepPreviousData,
        staleTime: 10000, // with staleTime we can see the effect of delete post
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data,id) => {
            queryClient.setQueryData(['posts',pageNumber], (currElm) => {
                return currElm.filter((post) => post.id !== id);
            })
        }
    })

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error : {error.message || "Something went wrong"}</p>

    return (
        <div>
            <ul className='section-accordion'>
                {data?.map((currElm)=> {
                    const {id,title,body} = currElm;
                    return (
                        <li key={id}>
                            <NavLink to={`/rq/${id}`}>
                                <p>{id}</p>
                                <p>{title}</p>
                                <p>{body}</p>
                            </NavLink>
                            <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                            {/* <button onClick={() => updateMutation.mutate(id)}>Update</button> */}
                        </li>
                    )
                })}
            </ul>
            <div className="pagination-section container">
                <button
                  disabled={pageNumber === 0 ? true : false}
                  onClick={() => setPageNumber(pageNumber - 3)}
                >Prev</button>
                <p>{pageNumber/3+1}</p>
                <button onClick={() => setPageNumber(pageNumber + 3)}>Next</button>
            </div>
        </div>
    )
}

