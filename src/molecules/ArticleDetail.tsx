import { FC } from 'react';
import { Post } from '../domains/models/post';

const ArticleDetail: FC<{ post: Post }> = ({ post }) => (
  <div className="pl-2">
    <h2 className="font-black text-xl break-words">{post.title}</h2>
    <time
      dateTime={new Date(post.publishedAt).toLocaleDateString()}
      className="text-sm text-gray-700"
    >
      {new Date(post.publishedAt).toLocaleDateString()}
    </time>
  </div>
);

export default ArticleDetail;
