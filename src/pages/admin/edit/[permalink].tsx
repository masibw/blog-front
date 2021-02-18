import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import ChipInput from 'material-ui-chip-input';

import 'easymde/dist/easymde.min.css';

import dynamic from 'next/dynamic';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Error from '../../../templates/Error';
import Loading from '../../../templates/Loading';
import { Post } from '../../../domains/models/post';
import AdminBreadcrumbs from '../../../molecules/AdminBreadcrumbs';
import { useRequireLogin } from '../../login';
import { Tag } from '../../../domains/models/tag';
import S3Uploader from '../../../molecules/S3Uploader';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type PostRes = {
  post: Post;
};

type PostReq = {
  post: Post;
  tags: string[];
};

type TagRes = {
  tags: Tag[];
};

const getPostByPermalink = (permalink = '') =>
  fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/v1/posts/${permalink}?is-markdown=true`,
  ).then((res) => res.json());

const getTagByPostId = (id = '') =>
  fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/tags?post=${id}`).then((res) =>
    res.json(),
  );

const Home: FC = () => {
  useRequireLogin();
  const router = useRouter();
  const [permalink, setPermalink] = useState<string>();
  const [post, setPost] = useState<Post>();

  const updateField = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const [tags, setTags] = useState<string[]>([]);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>();
  const {
    isLoading,
    error,
    data,
  }: {
    isLoading: boolean;
    error: Error;
    data: PostRes;
  } = useQuery([`post`, permalink], () => getPostByPermalink(permalink));

  useEffect(() => {
    if (router.asPath !== router.route) {
      setPost((p) => ({
        ...p,
        permalink: String(router.query.permalink),
      }));
      setPermalink(String(router.query.permalink));
    }
  }, [router]);

  const putPostMutation = useMutation(
    (postReq: PostReq) =>
      axios.put(
        `${process.env.NEXT_PUBLIC_HOST}/api/v1/posts/${postReq.post.id}`,
        postReq,
      ),
    {
      onError: (err) => {
        // eslint-disable-next-line no-console
        console.log(`failed to put`, err);
      },
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log('success put');
      },
    },
  );

  useEffect(() => {
    if (!isLoading && !error) {
      setPost((p) => ({
        ...p,
        content:
          localStorage.getItem(`mde_${data.post?.permalink}`) ||
          data.post?.content,
      }));
      setPost(data.post);
    }
  }, [data, isLoading, error]);

  const {
    data: tagData,
  }: {
    isLoading: boolean;
    error: Error;
    data: TagRes;
  } = useQuery([`post`, post?.id], () => getTagByPostId(post?.id), {
    enabled: !!post?.id,
  });

  useEffect(() => {
    if (tagData?.tags) {
      setTags(tagData.tags.map((tag) => tag.name));
    }
  }, [tagData]);

  const handleSave = () => {
    putPostMutation.mutate({ post, tags });
  };

  const handleAddChip = (chip: string) => {
    setTags([...tags, chip]);
  };

  const handleDeleteChip = (chip: string) => {
    setTags(tags.filter((c) => c !== chip));
  };

  const handleFinishedUploadThumbnail = (info: { file: { name: string; }; }) => {
    const uploadedThumbnailURL = `${
      process.env.NEXT_PUBLIC_S3URL
    }${info.file.name.replace(/[^\w\d_\-.]+/gi, '')}`;
    setPost({
      ...post,
      thumbnailUrl: uploadedThumbnailURL,
    });
  };
  const handleFinishedUploadInsertImage = (info: { file: { name: string; }; }) => {
    setUploadedFileUrl(
      `${process.env.NEXT_PUBLIC_S3URL}${info.file.name.replace(
        /[^\w\d_\-.]+/gi,
        '',
      )}`,
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <AdminBreadcrumbs permalink={post ? post.permalink : ''} />
      <div className="flex flex-col">
        <TextField
          margin="dense"
          id="title"
          label="title"
          name="title"
          type="text"
          fullWidth
          value={post ? post.title : ''}
          onChange={(e) => {
            updateField(e);
          }}
        />
        <TextField
          margin="dense"
          id="permalink"
          label="permalink"
          name="permalink"
          type="text"
          fullWidth
          value={post ? post.permalink : ''}
          onChange={(e) => {
            updateField(e);
          }}
        />
        <ChipInput
          value={tags}
          label="tags"
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
        />
        <div className="flex flex-row">
          <S3Uploader
            title="thumbnail"
            handleFinishedUpload={handleFinishedUploadThumbnail}
          />
          <S3Uploader
            title="insert image"
            handleFinishedUpload={handleFinishedUploadInsertImage}
          />
          <p>{uploadedFileUrl}</p>
        </div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={post ? post.isDraft : true}
                onChange={(e) => {
                  setPost({
                    ...post,
                    isDraft: e.target.checked,
                  });
                }}
                name="isDraft"
                color="primary"
              />
            }
            label="下書き"
          />
        </FormGroup>
        <Button variant="contained" color="primary" onClick={handleSave}>
          保存
        </Button>
      </div>
      <SimpleMDE
        id={`mde_${post ? post.permalink : ''}`}
        value={post ? post.content : ''}
        onChange={(e) =>
          setPost({
            ...post,
            content: e,
          })
        }
        options={{
          autosave: {
            enabled: true,
            uniqueId: `mde_${post ? post.permalink : ''}`,
            delay: 1000,
          },
        }}
        className="prose max-w-full"
      />
    </>
  );
};

export default Home;
