import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpiner from "./LodingSpinner";

const PostList = () => {

    const { postList, spinnerCurrState } = useContext(PostListData);

    return (
        <>
            {spinnerCurrState == true && <LoadingSpiner />}
            {spinnerCurrState == false && postList.length === 0 && <WelcomeMessage></WelcomeMessage>}
            {spinnerCurrState == false && postList.map((post) => (<Post key={post.id} post={post} />))}
        </>
    );
}

export const postLoader = () => {
    return fetch('https://dummyjson.com/posts')  /* return promise to loader */
        .then(res => res.json())
        .then(data => {
            return data.posts;
        });
}

export default PostList;