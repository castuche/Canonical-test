import { useState, useEffect } from "react";

const Card = () => {

    const [posts, setPosts] = useState();

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const postsData = await response.json();
            setPosts(postsData);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    
    useEffect(()=> {fetchPosts()}, []);

    const getAuthorName = (postId) => {
        const post = posts.find(post => post.id === postId);
        if (post && post._embedded && post._embedded.author) {
            const author = post._embedded.author[0];
            return author.name;
        }
        return "Unknown Author";
    };

    const getTopic = (postId) => {
        const post = posts.find(post => post.id === postId);
        if (post && post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][1]) {
            const topic = post._embedded['wp:term'][1][0];
            return topic.name;
        }
        return "Unknown Topic";
    };

    return (
        <>
        <div>
            {posts && posts.map(article => (
                <div key={article.id}>
                    <p>Topic: {getTopic(article.topic)}</p>
                    <p>Title: {article.title.rendered}</p>
                    <p>Author: {getAuthorName(article.author)}</p>
                </div>
            ))}
        </div>
        {/* <div className="row">
            <div className="col-5">
                <div className="p-card u-no-padding">
                <img className="p-card__image" src="https://assets.ubuntu.com/v1/0f33d832-The-State-of-Robotics.jpg"/>
                <div className="p-card__inner">
                    <h3>The State of Robotics - August 2021</h3>
                    <p>From robots learning to encourage social participation to detect serious environmental problems, it was a learning month.</p>
                </div>
                <hr className="u-no-margin--bottom"/>
                <div className="p-card__inner">
                </div>
                </div>
            </div>
        </div>  */}
        </>
    );
};

export default Card;