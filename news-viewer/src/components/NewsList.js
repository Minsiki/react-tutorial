import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../node_modules/axios/index';
import usePromise from '../lib/usePromise';
import NewsItem from './NewsItem';

const NewsListLBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=ff53774a200b41bda86c78eecdf138b2`,
    );
  }, [category]);

  if (loading) {
    return <NewsListLBlock>대기 중 ...</NewsListLBlock>;
  }

  if (!response) {
    return null;
  }

  if (error) {
    return <NewsListLBlock>에러 발생!</NewsListLBlock>;
  }
  const { articles } = response.data;
  return (
    <NewsListLBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListLBlock>
  );
};

export default NewsList;
