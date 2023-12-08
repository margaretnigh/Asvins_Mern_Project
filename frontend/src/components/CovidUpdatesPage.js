import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../css/CovidUpdatesPage.css';

const CovidUpdatesPage = () => {
  const [covidData, setCovidData] = useState(null);
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const covidResponse = await axios.get('https://disease.sh/v3/covid-19/all');
        setCovidData(covidResponse.data);
      } catch (error) {
        console.error('Error fetching COVID-19 data:', error.message);
      }
    };

    const fetchNewsData = async () => {
      try {
        const newsApiKey = '5b0b3aef691d4eb7a60fb540d813d4e7';
        const newsResponse = await axios.get(
          `https://newsapi.org/v2/top-headlines?q=covid&apiKey=${newsApiKey}`
        );
        setNewsData(newsResponse.data.articles);
      } catch (error) {
        console.error('Error fetching news data:', error.message);
      }
    };

    fetchCovidData();
    fetchNewsData();
  }, []);

  return (
    <div className="covid-updates-page">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Helmet>

      <div className="jumbotron bg-light text-white">
        <h1 className="display-4" style={{ color: 'white' }}>COVID-19 Global Statistics</h1>
        <p className="white">
          Stay informed about the latest COVID-19 statistics and news updates.
        </p>
      </div>

      {covidData && (
        <div className="data-container">
                <div className="data-container">
          <div className="data-item">
            <p className="data-label">Total Cases</p>
            <p className="data-value">{covidData.cases}</p>
          </div>
          <div className="data-item">
            <p className="data-label">Total Deaths</p>
            <p className="data-value">{covidData.deaths}</p>
          </div>
          <div className="data-item">
            <p className="data-label">Total Recovered</p>
            <p className="data-value">{covidData.recovered}</p>
          </div>
        </div>
        </div>
      )}

      {newsData && (
        <div className="covid-updates-page">
          <h2 className="news-heading">Latest News</h2>
          {newsData.map((news, index) => (
            <Link
              to={news.url}
              key={index}
              className="news-item"
              target="_blank"
              rel="noopener noreferrer">
              <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text">{news.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CovidUpdatesPage;