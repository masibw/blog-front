import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Image from 'next/image';

import Head from 'next/head';
import TagList from '../../molecules/TagList';
import Error from '../../templates/Error';
import Loading from '../../templates/Loading';
import { Post } from '../../domains/models/post';
import ShareButtons from '../../molecules/ShareButtons';

type PostRes = {
  post: Post;
};

const getPostByPermalink = (permalink = '') =>
  fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/v1/posts/${permalink}`,
  ).then((res) => res.json());

const Home: FC = () => {
  const router = useRouter();
  const [permalink, setPermalink] = useState<string>();

  const {
    isLoading,
    error,
    data,
  }: {
    isLoading: boolean;
    error: Error;
    data: PostRes;
  } = useQuery(`postsByTag_${permalink}`, () => getPostByPermalink(permalink));

  useEffect(() => {
    if (router.asPath !== router.route) {
      setPermalink(String(router.query.permalink));
    }
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content={`https://mesimasi.com${data.post?.permalink}`}
          key="og:url"
        />
        <meta
          property="og:image"
          content={`${data.post?.thumbnailUrl}`}
          key="og:image"
        />
      </Head>
      <main>
        <div className="md:flex md:flex-col md:items-center md:justify-center py-2 break-words">
          <div className="flex xl:flex-row flex-col align-top mt-10 max-w-screen-xl lg:w-9/12 ">
            <div className="md:w-9/12 w-12/12 order-1 bg-white shadow-2xl mr-8 p-8">
              <time
                dateTime={
                  data.post?.publishedAt
                    ? new Date(data.post.publishedAt).toLocaleDateString()
                    : '投稿時刻不明'
                }
              >
                {data.post?.publishedAt
                  ? new Date(data.post.publishedAt).toLocaleDateString()
                  : '投稿時刻不明'}
              </time>
              <h1 className="text-left text-4xl w-12/12 my-2">
                {!data.post?.title ? `タイトルなし` : data.post.title}
              </h1>
              <div className="flex justify-center mt-8">
                <Image
                  src={`${
                    data.post?.thumbnailUrl
                      ? data.post.thumbnailUrl
                      : '/no-img.jpg'
                  }`}
                  alt={`${data.post?.title}_thumbnail`}
                  width={700}
                  height={400}
                  layout="intrinsic"
                />
              </div>
              <ShareButtons />
              <div className="text-left my-4 lg:p-12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: !data.post
                      ? `投稿が存在しません`
                      : data.post.content,
                  }}
                  className="prose"
                />
              </div>
              <ShareButtons />

              <aside className="flex flex-col items-center md:flex-row  rounded-xl p-3 my-4 box-border border-2 border-solid border-current break-words">
                <div className="flex  m-4">
                  <Image
                    src="/icon.jpg"
                    alt="masi icon"
                    width={73}
                    height={73}
                    className="w-full rounded-3xl"
                    layout="intrinsic"
                  />
                </div>
                <div>
                  <div className="text-xl text-center md:text-left">
                    まし(@masibw)
                  </div>
                  <p className="my-4">
                    Go,Java,Scalaなどを用いてサーバーサイドを中心に書く学生エンジニアです。
                    Dockerの通信に関する研究をしています。
                  </p>
                  <a
                    href="https://github.com/masibw"
                    className="text-primary mr-4 align-bottom"
                  >
                    <i className="icon-github" aria-hidden="true" />
                    masibw
                  </a>
                  <a
                    href="https://twitter.com/masibw"
                    className="text-primary mr-4"
                  >
                    <i className="icon-twitter" aria-hidden="true" />
                    @masibw
                  </a>
                </div>
              </aside>
            </div>
            <TagList />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
