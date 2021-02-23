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
    <div className="cursor-pointer  p-1 mb-4 md:w-1/2">
      <Image
        src={`${post.thumbnailUrl ? post.thumbnailUrl : '/no-img.jpg'}`}
        alt={`${post.title}_thumbnail`}
        width={400}
        height={300}
        layout="responsive"
      />
      <ArticleDetail post={post} />
    </div>
  </Link>
);

export default Article;
