import React, { FC } from 'react';
import Link from 'next/link';
import { Tag } from '../domains/models/tag';
import styles from './TagRow.module.css';

const TagRow: FC<{ tag: Tag }> = ({ tag }) => (
  <Link href={{ pathname: '/posts', query: { tag: tag.name } }}>
    <li
      className={`cursor-pointer p-2 m-3 mb-2 leading-6 bg-secondary align-middle relative rounded-l-lg list-none ${styles.tagRow}`}
    >
      {tag.name}
    </li>
  </Link>
);

export default TagRow;
