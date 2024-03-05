import { useState } from "react";

const Card = () => {

    const [articles, setArticles] = useState();

    const fetchArticles = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}`);
    
            if (response.status === 200) {
                const articlesData = response.data;
                setArticles(articlesData);
                console.log(articlesData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchArticles();

    return (
        <>
        <div>
            {articles.map(article => {
                return <p>{article.id}</p>
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