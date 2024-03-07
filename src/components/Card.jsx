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
            console.error('There was a problem fetching the data from the api:', error);
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
        <div className="card-container">
            {posts && posts.map(article => (
                <a href={article.link} key={article.id} className="card">
                    <div className="card-content-middle">
                        <p className="topic">{getTopic(article.id)}</p>
                        <hr className="separator" />
                        <img src={article.featured_media} alt={article.title.rendered} />
                        <h2 className="title">{article.title.rendered}</h2>
                    </div>
                    <p className="author-date">
                        By{" "}
                            <a href={article._embedded.author[0].link} className="author">
                            {getAuthorName(article.id)}
                            </a>
                        {" "}
                        on <span className="date">{getDate(article.date)}</span></p>
                    <hr className="separator" />
                    <p className="category">{getCategory(article.id)}</p>
                </a>
            ))}
        </div>
    );
};

export default Card;