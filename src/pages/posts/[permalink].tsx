import React, { FC } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { NextPageContext } from 'next';
import TagList from '../../molecules/TagList';
import Error from '../../templates/Error';
import { Post } from '../../domains/models/post';
import ShareButtons from '../../molecules/ShareButtons';

type PostRes = {
  post: Post;
};

const getPostByPermalink = async (permalink = ''): Promise<PostRes> =>
  fetch(
    `${process.env.NEXT_PUBLIC_SSR_HOST}/api/v1/posts/${permalink}`,
  ).then((res) => new Promise<PostRes>((resolve)=> resolve(res.json())));

export async function getServerSideProps(context: NextPageContext) {
  const {permalink} = context.query
  const response: PostRes = await getPostByPermalink(typeof permalink === "string"? permalink : '')

  return {
    props: {
      post: response.post
    }
  }
}


const Home: FC<{post: Post}> = ({post}) => {

    if (!post) {
    return <Error />;
    }

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content={`https://mesimasi.com${post.permalink}`}
          key="og:url"
        />
        <meta
          property="og:image"
          content={`${post.thumbnailUrl}`}
          key="og:image"
        />
      </Head>
      <main>
        <div className="md:flex md:flex-col md:items-center md:justify-center py-2 break-words">
          <div className="flex md:flex-row flex-col align-top mt-10 max-w-screen-xl md:w-11/12 md:space-x-8 ">
            <div className="md:w-9/12 w-12/12 order-1 bg-white shadow-2xl p-8">
              <time
                dateTime={
                  post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : '投稿時刻不明'
                }
              >
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : '投稿時刻不明'}
              </time>
              <h1 className="text-left text-4xl w-12/12 my-2">
                {!post.title ? `タイトルなし` : post.title}
              </h1>
              <div className="flex justify-center mt-8">
                <Image
                  src={`${
                    post.thumbnailUrl
                      ? post.thumbnailUrl
                      : '/no-img.jpg'
                  }`}
                  alt={`${post.title}_thumbnail`}
                  width={700}
                  height={400}
                  layout="intrinsic"
                  className="object-contain"
                />
              </div>
              <ShareButtons />
              <div className="text-left my-4 lg:p-12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: !post
                      ? `投稿が存在しません`
                      : post.content,
                  }}
                  className="prose md:prose-lg max-w-4xl"
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
