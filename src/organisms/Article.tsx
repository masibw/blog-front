import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../domains/models/post';
import ArticleDetail from '../molecules/ArticleDetail';

const Article: FC<{ post: Post }> = ({ post }) => (
  <Link
    href={{
      pathname: '/posts/[permalink]',
      query: { permalink: post.permalink },
    }}
  >
    <div className="cursor-pointer border m-1">
      <Image
        src="/no-img.jpg"
        alt="thumbnail"
        width={400}
        height={300}
        layout="fixed"
        className="md:w-full w-11/12"
      />
      <ArticleDetail post={post} />
    </div>
  </Link>
);

export default Article;
