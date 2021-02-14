import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import TagList from '../../molecules/TagList';
import ArticleList from '../../templates/ArticleList';
import Error from '../../templates/Error';
import Loading from '../../templates/Loading';
import { Post } from '../../domains/models/post';

type PostRes = {
  count: number;
  posts: Post[];
};

const getPostsByTag = (
  tagName = '',
  page = 1,
  pageSize = 10,
  isDraft = 'false',
) =>
  fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/v1/posts?page=${page}&page-size=${pageSize}&is-draft=${isDraft}&tag=${tagName}`,
  ).then((res) => res.json());

const Home: FC = () => {
  const router = useRouter();
  const [tagName, setTagName] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const {
    isLoading,
    error,
    data,
  }: {
    isLoading: boolean;
    error: Error;
    data: PostRes;
  } = useQuery(`postsByTag_${tagName}`, () => getPostsByTag(tagName, page));

  const handleClick = (selectedData: { selected: number }) => {
    const { selected } = selectedData;
    // 0-indexedなので+1する(サーバーは1ページから始める)
    setPage(selected + 1);
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      setTagName(String(router.query.name));
    }
  }, [router]);

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
            title={`${tagName}の記事`}
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
