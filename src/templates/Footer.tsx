import React, { FC } from 'react';
import Link from 'next/link';
import { TwitterIcon, TwitterShareButton } from 'react-share';

const Footer: FC = () => (
  <div className="flex align-bottom p-4 w-full bg-primary text-white justify-between">
    <div className="bg-white rounded-full w-12 h-12">
      <TwitterShareButton
        url="https://mesimasi.com"
        title="めしまし"
        className="w-12 h-12"
      >
        <TwitterIcon size={36} round className="m-auto" />
      </TwitterShareButton>
    </div>
    <div className="text-center align-text-bottom">
      <Link href="/terms">
        <a>利用規約</a>
      </Link>
      <p>copyright ©めしまし All Rights Reserved.</p>
    </div>
  </div>
);

export default Footer;
