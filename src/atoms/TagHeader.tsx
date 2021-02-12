import React, { FC } from 'react';

import styles from './TagHeader.module.css';

const TagHeader: FC = () => (
  <h2
    className={`p-2 text-2xl text-center bg-primary leading-10 text-white ${styles.tagHeader}`}
  >
    タグ
  </h2>
);

export default TagHeader;
