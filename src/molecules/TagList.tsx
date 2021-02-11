import React, { FC } from 'react';
import { Tag } from '../domains/models/tag';
import TagRow from '../atoms/TagRow';
import TagHeader from '../atoms/TagHeader';

const TagList: FC<{ tags: Tag[] }> = ({ tags = [] }) => (
  <div className="p-0 md:w-3/12 w-10/12 m-auto md:m-0 order-2">
    <TagHeader />
    <ul>
      {tags.map((tag) => (
        <TagRow key={tag.id} tag={tag} />
      ))}
    </ul>
  </div>
);

export default TagList;
