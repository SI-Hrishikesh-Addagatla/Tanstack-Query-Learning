import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUsers } from "../api/api";
import { useInView } from "react-intersection-observer";

export default function InfiniteScroll(){
    const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => {
            console.log("lastPage", lastPage, allPages);
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        },
    });

    const {ref, inView} = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if(inView && hasNextPage)
            fetchNextPage();
    }, [hasNextPage,fetchNextPage,inView]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "error") return <p>Error fetching data</p>;

  return (
    <div>
      <h1>Infinite Scroll with React Query v5</h1>

      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user) => (
            <li
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      
      <p ref={ref} style={{ padding: "20px", textAlign: "center" }}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll down to load more"
          : "No more users"}
      </p>
    </div>
  );
};