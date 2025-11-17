import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaNewspaper, FaHistory, FaCalendarAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./NewsAndUpdates.css";

const NewsCard = ({ news }) => (
  <div className="news-card">
    <div className="news-card-icon">
      <FaNewspaper />
    </div>
    <div className="news-card-header">
      <h3 className="news-card-title">{news.news_title}</h3>
      <div className="news-card-date">
        <FaCalendarAlt /> Latest Update
      </div>
    </div>
    <div className="news-card-content">
      <p>{news.news_content}</p>
    </div>
    <div className="news-card-footer">
      <span className="read-more">Read More →</span>
    </div>
  </div>
);

const NewsAndUpdates = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/news/getnews");
        if (response.data && Array.isArray(response.data.news)) {
          setNewsList(response.data.news);
        } else {
          throw new Error("Expected an array of news");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Custom arrow components
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(newsList.length, 3),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: Math.min(newsList.length, 2),
          dots: true 
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 1,
          dots: true 
        } 
      },
    ],
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading exciting news...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="retry-btn">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="news-and-updates">
      {/* Header Section */}
      <div className="news-hero">
        <div className="hero-content">
          <h1 className="news-main-title">
            <FaNewspaper className="title-icon" />
            News & Updates
          </h1>
          <p className="news-subtitle">Stay informed with the latest from Harvard University</p>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
        </div>
      </div>

      {/* News Slider Section */}
      <section className="news-slider-section">
        <div className="section-header">
          <h2>Latest News</h2>
          <div className="section-divider"></div>
        </div>
        
        {newsList.length === 0 ? (
          <div className="no-news">
            <div className="no-news-icon">📰</div>
            <h3>No News Yet</h3>
            <p>Check back later for exciting updates from Harvard!</p>
          </div>
        ) : (
          <div className="news-slider-container">
            <Slider {...settings}>
              {newsList.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </Slider>
          </div>
        )}
      </section>

      {/* Historical Highlight Section */}
      <section className="historical-section">
        <div className="section-header">
          <h2><FaHistory className="title-icon" /> Historical Highlight</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="historical-card">
          <div className="historical-image">
            <img 
              src="/History.png" 
              alt="Harvard History" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="image-placeholder">
              <FaHistory />
              <span>Harvard History</span>
            </div>
          </div>
          <div className="historical-content">
            <div className="historical-badge">Legacy & Impact</div>
            <h3>Harvard and the Legacy of Slavery</h3>
            <p>
              On April 26, 2022, Harvard President Larry Bacow released the Report
              of the Committee on Harvard & the Legacy of Slavery, accepted the
              committee's recommendations in full, and announced a historic
              commitment of $100 million to fund their implementation.
            </p>
            <div className="historical-stats">
              <div className="stat">
                <strong>$100M</strong>
                <span>Historic Commitment</span>
              </div>
              <div className="stat">
                <strong>2022</strong>
                <span>Landmark Report</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsAndUpdates;