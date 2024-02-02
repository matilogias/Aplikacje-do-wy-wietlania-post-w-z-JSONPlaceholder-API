import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.log(error));

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.log(error));
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Trim text by words number and add "..." if trimmed
    const trimText = (text, words) => {
        const wordArray = text.split(' ');
        if (wordArray.length > words) {
            return wordArray.slice(0, words).join(' ') + '...';
        }
        return text;
    };


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="posts flex flex-col justify-between h-full">
            <div>
                {currentPosts.map((post, index) => (
                    <Link to={`/post/${post.id}`} className="text-gray-200">
                        <div key={post.id} className={`post p-5 my-4 ${index === currentPosts.length - 1 ? '' : 'border-b-2'}`}>
                            <h2 className="text-2xl font-bold">{trimText(post.title, 4)}
                            </h2>
                            <p>
                                {trimText(post.body, 8)}
                            </p>
                            <p className="text-gray-400 text-right">
                                {users.find(user => user.id === post.userId)?.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="pagination flex justify-between w-full">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Poprzedna strona
                </button>
                <p>{currentPage}/{Math.ceil(posts.length / postsPerPage)}</p>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
                    Następna strona
                </button>
            </div>
        </div >
    );
};

export default Posts;