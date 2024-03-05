import { useState } from "react";

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
    
    fetchPosts();

    return (
        <>
        <div>
            {posts && posts.map(article => {
                return <p key={article.id}>{article.id}</p>; 
            })}
        </div>
        <div className="row">
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
        </div> 
        </>
    );
};

export default Card;