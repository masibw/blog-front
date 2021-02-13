import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Tag } from '../domains/models/tag';
import TagRow from '../atoms/TagRow';
import TagHeader from '../atoms/TagHeader';

type TagRes = {
  tags: Tag[];
};

const getTags = () =>
  fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/tags`).then((res) =>
    res.json(),
  );

const TagList: FC = () => {
  const {
    isLoading,
    error,
    data,
  }: { isLoading: boolean; error: Error; data: TagRes } = useQuery('tags', () =>
    getTags(),
  );

  if (isLoading)
    return (
      <div className="p-0 md:w-3/12 w-10/12 m-auto md:m-0 order-2 bg-white shadow-2xl ">
        <TagHeader />
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-0 md:w-3/12 w-10/12 m-auto md:m-0 order-2 bg-white shadow-2xl ">
        <TagHeader />
        <p>An error occurred: {error.message}</p>
      </div>
    );

  return (
    <div className="p-0 self-start md:w-3/12 w-10/12 m-auto md:m-0 order-2 bg-white shadow-2xl">
      <TagHeader />
      <ul>
        {data.tags.map((tag: Tag) => (
          <TagRow key={tag.id} tag={tag} />
        ))}
      </ul>
    </div>
  );
};
export default TagList;
