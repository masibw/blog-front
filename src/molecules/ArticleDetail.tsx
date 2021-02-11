import { FC } from 'react';
import { Post } from '../domains/models/post';

const ArticleDetail: FC<{ post: Post }> = ({ post }) => (
  <div className="pl-2">
    <h2 className="font-black text-xl">{post.title}</h2>
    <p className="text-sm text-gray-700">
      {new Date(post.publishedAt).toLocaleDateString()}
    </p>
  </div>
);

export default ArticleDetail;
