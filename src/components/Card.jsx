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
            console.log(posts);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    
    useEffect(()=> {fetchPosts()}, [ ]);

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
        if (!post || !post.topic) {
            return "Unknown Topic";
        }
        
        const topicId = post.topic[0]; 

        if (post._embedded && post._embedded['wp:term']) {
            const wpTerm = post._embedded['wp:term'];
            for (const termArray of wpTerm) {
                const topic = termArray.find(term => term.id === topicId);
                if (topic) {
                    return topic.name;
                }
            }
        }
        
        return "Unknown Topic";
    };

    const getDate = (dateString) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };
   
    const getCategory = (postId) => {
        const post = posts.find(post => post.id === postId);
        if (!post || !post.categories) {
            return "Unknown Category";
        }
        
        const categoryId = post.categories[0]; 

        if (post._embedded && post._embedded['wp:term']) {
            const wpTerm = post._embedded['wp:term'];
            for (const termArray of wpTerm) {
                const category = termArray.find(term => term.id === categoryId);
                if (category) {
                    if (category.name === "Articles") {return "Article"}
                    else {return category.name;}
                }
            }
        }
        
        return "Unknown Category";
    };

    return (
        <>
        <div>
            {posts && posts.map(article => (
                <div key={article.id}>
                    <p>Topic: {getTopic(article.id)}</p>
                    <img src={article.featured_media} alt={article.title.rendered} />
                    <p>Title: {article.title.rendered}</p>
                    <p>By {getAuthorName(article.id)} on {getDate(article.date)}</p>
                    <p>{getCategory(article.id)}</p>
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