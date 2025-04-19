
import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';
import { fetchInvPost } from '../api/api';

export default function FetchIndv(){
    const {id} = useParams();
    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['post'], 
        queryFn: () => fetchInvPost(id), 
    })

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error : {error.message || "Something went wrong"}</p>

    return (
        <div className='section-accordion'>
            <h1>Post ID - number {data.id}</h1>
            <div>
                <p>ID: {data.id}</p>
                <p>Title: {data.title}</p>
                <p>Body: {data.body}</p>
            </div>

            <NavLink to='/rq'>
              <button>Go Back</button>
            </NavLink>
        </div>
    )
}

