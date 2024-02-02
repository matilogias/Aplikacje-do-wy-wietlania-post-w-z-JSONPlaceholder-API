import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PostPage = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.log(error));

        fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.log(error));

        fetch('https://jsonplaceholder.typicode.com/users/' + post?.userId)
            .then(response => response.json())
            .then(data => setAuthor(data))
            .catch(error => console.log(error));
    }, [id, post?.userId]);

    if (!post || !author) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`post p-5 my-4`}>
            <Link to={`/`} className="text-gray-200 mb-4 block">
                Powrót
            </Link>
            <div className="post mb-4">
                <h2 className="text-2xl font-bold">
                    {post.title}
                </h2>
                <p>
                    {post.body}
                </p>
                <p className="text-gray-400 text-right">
                    {author.name}
                </p>
            </div>
            <div className="comments">
                <h3 className="text-xl font-bold mb-3">
                    Komentarze:
                </h3>
                {comments.map(comment => (
                    <div key={comment.id} className="border-l-2 mb-3 p-2">
                        <h4>
                            {comment.name}
                        </h4>
                        <p>
                            {comment.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPage;