import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpiner from "./LodingSpinner";

const PostList = () => {

    const { postList, addInitialPost } = useContext(PostListData);
    const [fetching, setFetching] = useState(false);  /* for spiner */

    useEffect(() => {
        setFetching(true);

        const controller = new AbortController();
        const signal = controller.signal;

        fetch('https://dummyjson.com/posts', { signal })
            .then(res => res.json())
            .then(data => {
                addInitialPost(data.posts);
                setFetching(false);
            });

        return () => {
            controller.abort();
            /*  clean up api call if we are at different components then api request not call */
        }
    }, []);


    return (
        <>
            {fetching == true && <LoadingSpiner />}
            {fetching == false && postList.length === 0 && <WelcomeMessage></WelcomeMessage>}
            {postList.map((post) => (<Post key={post.id} post={post} />))}
        </>
    );
}

export default PostList;