import React, { FC } from 'react';
import Link from 'next/link';
import TwitterShareButton from '../atoms/TwitterShareButton';

const Footer: FC = () => (
  <div className="flex align-bottom p-4 w-full bg-primary text-white justify-between">
    <TwitterShareButton />
    <div className="text-center align-text-bottom">
      <Link href="/terms">
        <a>利用規約</a>
      </Link>
      <p>copyright ©めしまし All Rights Reserved.</p>
    </div>
  </div>
);

export default Footer;
