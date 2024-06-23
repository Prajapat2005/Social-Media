import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";

const CreatePost = () => {

    const { addPost } = useContext(PostList);

    const userIDElement = useRef();
    const postTitleElement = useRef();
    const postBodyElement = useRef();
    const reactionsElement = useRef();
    const tagsElement = useRef();

    const handleSubmit = (event) => {
        event.preventDefault(); /* do not submit to surver or local host */

        const userID = userIDElement.current.value;
        const postTitle = postTitleElement.current.value;
        const postBody = postBodyElement.current.value;
        const reactions = reactionsElement.current.value;
        const tags = tagsElement.current.value.split(" ");

        addPost(userID, postTitle, postBody, reactions, tags);

        userIDElement.current.value = "";
        postTitleElement.current.value = "";
        postBodyElement.current.value = "";
        reactionsElement.current.value = "";
        tagsElement.current.value = "";

    };

    return (
        <>
            <form className="create-post" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">User ID</label>
                    <input ref={userIDElement} type="text" className="form-control" id="id" placeholder="Your user ID" />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input ref={postTitleElement} type="text" className="form-control" id="title" placeholder="Title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea ref={postBodyElement} rows="3" type="text" className="form-control" id="body" placeholder="Tell us more about it" />
                </div>
                <div className="mb-3">
                    <label htmlFor="reaction" className="form-label">Number of Reactions</label>
                    <input ref={reactionsElement} type="text" className="form-control" id="reaction" />
                </div>
                <div className="mb-3">
                    <label htmlFor="hashtage" className="form-label">Hashtage</label>
                    <input ref={tagsElement} type="text" className="form-control" id="hashtage" placeholder="Enter hashtages using space" />
                </div>


                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary">Post</button>
            </form>
        </>
    );
}

export default CreatePost;