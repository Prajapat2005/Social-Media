import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list-store";

const Post = ({ post }) => {

    const { deletePost } = useContext(PostList);

    return (
        <>
            <div className="card post-card" style={{}}>
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <h5 className="card-title">{post.title}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            <MdDelete onClick={() => deletePost(post.id)} />
                        </span>
                    </h5>
                    <p className="card-text" >{post.body}</p>
                    {post.tags.map((tag) => (<span key={tag} className="badge text-bg-primary tag">{`# ${tag}`}</span>))}
                    <div className="alert alert-success reaction" role="alert">
                        This Post have been reacted by {Math.floor(Math.random() * 10)} people.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;