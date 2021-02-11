import Head from 'next/head';

import {Html} from "next/document";
import React, {FC} from "react";
import ArticleList from '../templates/ArticleList';
import { Post } from '../domains/models/post';
import { Tag } from '../domains/models/tag';
import TagList from '../molecules/TagList';

const Posts: Post[] = [
  {
    id: 'abcdefghijklmnopqrstuvwxy1',
    title: '新規投稿',
    thumbnailUrl: 'new_thumbnail_url',
    content: 'new_content',
    permalink: 'new_permalink',
    isDraft: false,
    createdAt: '2021-01-24T17:49:01+09:00',
    updatedAt: '2021-01-24T17:49:01+09:00',
    publishedAt: '2021-01-26T17:49:01+09:00',
  },
  {
    id: 'abcdefghijklmnopqrstuvwxy2',
    title: '新規投稿2',
    thumbnailUrl: 'new_thumbnail_url',
    content: 'new_content',
    permalink: 'new_permalink',
    isDraft: false,
    createdAt: '2021-01-24T17:49:01+09:00',
    updatedAt: '2021-01-24T17:49:01+09:00',
    publishedAt: '2021-01-25T17:49:01+09:00',
  },
  {
    id: 'abcdefghijklmnopqrstuvwxy3',
    title: '新規投稿3',
    thumbnailUrl: 'new_thumbnail_url',
    content: 'new_content',
    permalink: 'new_permalink',
    isDraft: false,
    createdAt: '2021-01-24T17:49:01+09:00',
    updatedAt: '2021-01-24T17:49:01+09:00',
    publishedAt: '2021-01-24T17:49:01+09:00',
  },
];

const Tags: Tag[] = [
  {
    id: 'abcdefghijklmnopqrstuvwxyz',
    name: 'new_tag',
    createdAt: '2021-01-24T17:49:01+09:00',
    updatedAt: '2021-01-24T17:49:01+09:00',
  },
  {
    id: 'abcdefghijklmnopqrstuvwxy2',
    name: 'タグ2',
    createdAt: '2021-01-24T17:49:01+09:00',
    updatedAt: '2021-01-24T17:49:01+09:00',
  },
];

const Home: FC = () => (
      <div className="flex flex-col items-center justify-center py-2">
      <main>
        <div className="flex flex-none md:flex-row flex-col align-top mt-10 max-w-screen-xl ">
          <ArticleList posts={Posts} />
          <TagList tags={Tags} />
        </div>
      </main>
    </div>
  );

export default Home
