import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';
import { Post } from '../domains/models/post';
import Article from '../organisms/Article';
import styles from './ArticleList.module.css';

type PostRes = {
  count: number;
  posts: Post[];
};

const getPosts = (page = 1, pageSize = 10, isDraft = 'false') =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/posts?page=${page}&page-size=${pageSize}&is-draft=${isDraft}`,
  ).then((res) => res.json());

const ArticleList: FC = () => {
  const {
    isLoading,
    error,
    data,
  }: { isLoading: boolean; error: Error; data: PostRes } = useQuery(
    'posts',
    () => getPosts(),
  );

  if (isLoading) {
    return (
      <div className="md:w-9/12 w-12/12 order-1">
        <h1
          className={`text-center m-auto text-4xl w-10/12 ${styles.titleBorder}`}
        >
          最新記事
        </h1>
        <div className="flex xl:flex-row flex-col flex-wrap justify-between text-left p-12">
          Loading...
        </div>
        <ReactPaginate
          previousLabel="prev"
          nextLabel="next"
          breakLabel="..."
          pageCount={0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={null}
          containerClassName="pagination"
          pageLinkClassName="paginate-box"
          breakClassName="paginate-break-box"
          breakLinkClassName="paginate-break"
          nextLinkClassName="paginate-next"
          previousLinkClassName="paginate-prev"
          activeClassName="active"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:w-9/12 w-12/12 order-1">
        <h1
          className={`text-center m-auto text-4xl w-10/12 ${styles.titleBorder}`}
        >
          最新記事
        </h1>
        <div className="flex xl:flex-row flex-col flex-wrap justify-between text-left p-12">
          {`An error occured: ${error.message}`}
        </div>
        <ReactPaginate
          previousLabel="prev"
          nextLabel="next"
          breakLabel="..."
          pageCount={0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={null}
          containerClassName="pagination"
          pageLinkClassName="paginate-box"
          breakClassName="paginate-break-box"
          breakLinkClassName="paginate-break"
          nextLinkClassName="paginate-next"
          previousLinkClassName="paginate-prev"
          activeClassName="active"
        />
      </div>
    );
  }

  return (
    <div className="md:w-9/12 w-12/12 order-1">
      <h1
        className={`text-center m-auto text-4xl w-10/12 ${styles.titleBorder}`}
      >
        最新記事
      </h1>
      <div className="flex xl:flex-row flex-col flex-wrap justify-between text-left p-12">
        {!data.posts
          ? `投稿が存在しません`
          : data.posts.map((post) => <Article key={post.id} post={post} />)}
      </div>
      <ReactPaginate
        previousLabel="prev"
        nextLabel="next"
        breakLabel="..."
        pageCount={(data.count ? data.count/10 : 0)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={null}
        containerClassName="pagination"
        pageLinkClassName="paginate-box"
        breakClassName="paginate-break-box"
        breakLinkClassName="paginate-break"
        nextLinkClassName="paginate-next"
        previousLinkClassName="paginate-prev"
        activeClassName="active"
      />
    </div>
  );
};

export default ArticleList;
