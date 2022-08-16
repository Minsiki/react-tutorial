import React from 'react';
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
const getCategory = (name, text) => {
  return { name, text };
};
const categories = [
  getCategory('all', '전체보기'),
  getCategory('business', '비즈니스'),
  getCategory('entertainment', '엔터테인먼트'),
  getCategory('health', '건강'),
  getCategory('science', '과학'),
  getCategory('sports', '스포츠'),
  getCategory('technology', '기술'),
];

const CetegoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  &:active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;

    &:hover {
      color: #3bc9db;
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;

const Categories = () => {
  const { category } = useParams();
  return (
    <CetegoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          activeclassname="active"
          to={c.name === 'all' ? '/' : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CetegoriesBlock>
  );
};

export default Categories;
