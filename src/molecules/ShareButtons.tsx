import React, { FC } from 'react';
import {
  TwitterShareButton,
  PocketShareButton,
  TwitterIcon,
  HatenaShareButton,
  FacebookShareButton,
  HatenaIcon,
  PocketIcon,
  FacebookIcon,
} from 'react-share';
import { useRouter } from 'next/router';

const ShareButtons: FC = () => {
  const router = useRouter();

  const shareUrl = router.asPath;

  return (
    <div className="flex justify-center mt-8">
      <TwitterShareButton
        url={process.env.NEXT_PUBLIC_HOST + shareUrl}
        title="めしまし"
      >
        <TwitterIcon className="m-auto w-4/1" />
      </TwitterShareButton>
      <FacebookShareButton url={process.env.NEXT_PUBLIC_HOST + shareUrl}>
        <FacebookIcon className="m-auto w-4/1" />
      </FacebookShareButton>
      <HatenaShareButton url={process.env.NEXT_PUBLIC_HOST + shareUrl}>
        <HatenaIcon className="w-4/1" />
      </HatenaShareButton>
      <PocketShareButton url={process.env.NEXT_PUBLIC_HOST + shareUrl}>
        <PocketIcon className="w-4/1" />
      </PocketShareButton>
    </div>
  );
};

export default ShareButtons;
