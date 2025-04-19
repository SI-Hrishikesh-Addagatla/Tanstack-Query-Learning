import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/api';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function FetchRQ(){

    const [pageNumber, setPageNumber] = useState(0);

    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['posts',pageNumber], 
        queryFn: () => fetchPosts(pageNumber), 
        placeholderData: keepPreviousData,
    })

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error : {error.message || "Something went wrong"}</p>

    return (
        <div>
            <ul className='section-accordion'>
                {data?.map((currElm)=> {
                    const {id,title,body} = currElm;
                    return (
                        <NavLink to={`/rq/${id}`}>
                            <li key={id}>
                                <p>{id}</p>
                                <p>{title}</p>
                                <p>{body}</p>
                            </li>
                        </NavLink>
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

