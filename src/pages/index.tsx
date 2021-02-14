import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import ArticleList from '../templates/ArticleList';
import TagList from '../molecules/TagList';
import { Post } from '../domains/models/post';
import Loading from '../templates/Loading';
import Error from '../templates/Error';

type PostRes = {
  count: number;
  posts: Post[];
};

const getPosts = (page = 1, pageSize = 10, isDraft = 'false') =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/posts?page=${page}&page-size=${pageSize}&is-draft=${isDraft}`,
  ).then((res) => res.json());

const Home: FC = () => {
  const [page, setPage] = useState<number>(1);

  const {
    isLoading,
    error,
    data,
  }: { isLoading: boolean; error: Error; data: PostRes } = useQuery(
    ['posts', page],
    () => getPosts(page),
  );

  const handleClick = (selectedData: { selected: number }) => {
    const { selected } = selectedData;
    // 0-indexedなので+1する(サーバーは1ページから始める)
    setPage(selected + 1);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center py-2">
        <div className="flex flex-none xl:flex-row flex-col align-top mt-10 max-w-screen-xl lg:w-9/12 ">
          <ArticleList
            title="最新記事"
            posts={data.posts}
            count={data.count}
            handleClick={handleClick}
          />
          <TagList />
        </div>
      </div>
    </main>
  );
};

export default Home;
