import React, { FC } from 'react';
import ArticleList from '../templates/ArticleList';
import TagList from '../molecules/TagList';

const Home: FC = () => (
  <main>
    <div className="flex flex-col items-center justify-center py-2">
      <div className="flex flex-none xl:flex-row flex-col align-top mt-10 max-w-screen-xl lg:w-9/12 ">
        <ArticleList />
        <TagList />
      </div>
    </div>
  </main>
);

export default Home;
