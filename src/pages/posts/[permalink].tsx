import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Image from 'next/image';
import TagList from '../../molecules/TagList';
import Error from '../../templates/Error';
import Loading from '../../templates/Loading';
import { Post } from '../../domains/models/post';

type PostRes = {
  post: Post;
};

const getPostsByTag = (permalink = '') =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/posts/${permalink}`,
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
  } = useQuery(`postsByTag_${permalink}`, () => getPostsByTag(permalink));

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
    <main>
      <div className="flex flex-col items-center justify-center py-2">
        <div className="flex flex-none xl:flex-row flex-col align-top mt-10 max-w-screen-xl lg:w-9/12 ">
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
            <h1 className="text-left text-4xl w-10/12 my-2">
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
                className="flex justify-center"
              />
            </div>
            <div className="flex xl:flex-row flex-col flex-wrap justify-between text-left p-12">
              <div
                dangerouslySetInnerHTML={{
                  __html: !data.post ? `投稿が存在しません` : data.post.content,
                }}
                className="prose"
              />
            </div>
            <aside className="flex rounded-xl p-3 m-6 box-border border-2 border-solid border-current">
              <div className="flex flex-shrink-0 items-center mr-4">
                <Image
                  src="/icon.jpg"
                  alt="masi icon"
                  width={73}
                  height={73}
                  className="w-full rounded-3xl"
                />
              </div>
              <div>
                <div className="text-xl">まし(@masibw)</div>
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
  );
};

export default Home;
