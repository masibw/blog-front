import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { Post } from '../domains/models/post';
import Article from '../organisms/Article';
import styles from './ArticleList.module.css';

const ArticleList: FC<{ title: string; posts: Post[]; count: number }> = ({
  title,
  posts,
  count,
}) => (
  <div className="md:w-9/12 w-12/12 order-1">
    <h1 className={`text-center m-auto text-4xl w-10/12 ${styles.titleBorder}`}>
      {title}
    </h1>
    <div className="flex xl:flex-row flex-col flex-wrap justify-between text-left p-12">
      {!posts
        ? `投稿が存在しません`
        : posts.map((post) => <Article key={post.id} post={post} />)}
    </div>
    <ReactPaginate
      previousLabel="prev"
      nextLabel="next"
      breakLabel="..."
      pageCount={count ? count / 10 : 0}
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

export default ArticleList;
