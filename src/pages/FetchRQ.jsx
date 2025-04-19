
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/api';
import { NavLink } from 'react-router-dom';

export default function FetchRQ(){
    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['posts'], // useState
        queryFn: fetchPosts, // useEffect
        // gcTime: 1000,
        // staleTime: 5000,
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true
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
                                <p>{title}</p>
                                <p>{body}</p>
                            </li>
                        </NavLink>
                    )
                })}
            </ul>
        </div>
    )
}

