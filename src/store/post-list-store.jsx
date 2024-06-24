import { createContext, useCallback, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
    postList: [],
    addPost: () => { },
    deletePost: () => { },
    spinnerCurrState: false,
    /* addInitialPost: () => { }, */
});

const postListReducer = (currPostList, action) => {

    let newPostList = currPostList;

    if (action.type === "DELETE_POST") {
        newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
        /* if true then element remain else delete --> filter work */
    }
    else if (action.type === "ADD_POST") {
        newPostList = [action.payload, ...currPostList];  /* sprade operator */
    }
    else if (action.type === "ADD_INITIAL_POST") {
        newPostList = action.payload.posts;
    }

    return newPostList;

}


const PostListProvider = ({ children }) => {

    const [postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST);

    const addPost = useCallback((postObj) => {
        dispatchPostList({
            type: "ADD_POST",
            payload: postObj,      // post object is created by server
            /* id: Date.now(),
            title: postTitle,
            body: postBody,
            reactions: reactions,
            userID: userID,
            tags: tags, */

        })
    }, [dispatchPostList]);

    const addInitialPost = useCallback((posts) => {
        dispatchPostList({
            type: "ADD_INITIAL_POST",
            payload: {
                posts: posts,
            }
        });
    }, [dispatchPostList]);

    const deletePost = useCallback((postId) => {
        dispatchPostList({
            type: "DELETE_POST",
            payload: {
                postId: postId
            }
        });
    }, [dispatchPostList]);

    /*  depend only on dispatchPostList if it change then funciton will re-render  else useCallback prevent depetePost to re-render or to create another reference*/


    const [spinnerCurrState, setSpinnerCurrState] = useState(false);  /*  for spinner  */

    useEffect(() => {
        setSpinnerCurrState(true);

        /* const controller = new AbortController();   use to block api fetching if tab is change
        const signal = controller.signal; */

        fetch('https://dummyjson.com/posts',/*  { signal } */)
            .then(res => res.json())
            .then(data => {
                addInitialPost(data.posts);
                setSpinnerCurrState(false);
            });

        /*  return () => {
             controller.abort();
             console.log("Tab change");
              clean up api call if we are at different components then api request not call  
         } */
    }, []);

    return (
        <PostList.Provider value={{
            postList: postList,
            addPost: addPost,
            deletePost: deletePost,
            spinnerCurrState: spinnerCurrState,  /* passing spinner state to all children */
            /* addInitialPost: addInitialPost, */
            /* already done by provider once when it execute no need to pass to childere */
        }}>
            {children}
        </PostList.Provider>
    );
};

const DEFAULT_POST_LIST = [

];

export default PostListProvider;