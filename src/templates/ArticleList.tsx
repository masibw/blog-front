import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { Post } from '../domains/models/post';
import Article from '../organisms/Article';
import styles from './ArticleList.module.css';

const ArticleList: FC<{ posts: Post[] }> = ({ posts = [] }) => (
  <div className="md:w-9/12 w-12/12 order-1">
    <h1 className={`text-center m-auto text-4xl w-10/12 ${styles.titleBorder}`}>
      最新記事
    </h1>
    <div className="flex flex-wrap md:flex-row flex-col flex-none justify-between text-left p-12">
      {posts.map((post) => (
        <Article key={post.id} post={post} />
      ))}
    </div>
    <ReactPaginate
      previousLabel="prev"
      nextLabel="next"
      breakLabel="..."
      pageCount={6}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={null}
      containerClassName="pagination"
      pageLinkClassName="paginate-box"
      breakClassName="paginate-break-box"
      breakLinkClassName="paginate-break"
      subContainerClassName="pages pagination"
      nextLinkClassName="paginate-next"
      previousLinkClassName="paginate-prev"
      activeClassName="active"
    />
  </div>
);

export default ArticleList;
