import React, { FC, useState } from 'react';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useMutation, useQuery } from 'react-query';
import ReactPaginate from 'react-paginate';
import { Button } from '@material-ui/core';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRouter } from 'next/router';
import { useRequireLogin } from './login';
import AdminArticleList from '../molecules/AdminArticleList';
import { Post } from '../domains/models/post';
import Error from '../templates/Error';
import Loading from '../templates/Loading';
import { Tag } from '../domains/models/tag';

type PostRes = {
  count: number;
  posts: Post[];
};

type PostReq = {
  post: Post;
  tags: Tag[];
};

const getPosts = (page = 1, pageSize = 10) =>
  fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/v1/posts?page=${page}&page-size=${pageSize}&order=-createdAt`,
  ).then((res) => res.json());

const Admin: FC = () => {
  useRequireLogin();
  const [dense] = React.useState(false);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState<number>(1);
  const [newPost, setNewPost] = useState<Post>({} as Post);

  const updateField = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const {
    isLoading,
    error,
    data,
  }: { isLoading: boolean; error: Error; data: PostRes } = useQuery(
    ['posts', page],
    () => getPosts(page),
  );

  const createEmptyPostMutation = useMutation(
    () => axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/v1/posts`),
    {
      onError: (err) => {
        // An error happened!
        // eslint-disable-next-line no-console
        console.log(`failed to create`, err);
      },
      onSuccess: (data2) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setNewPost(data2.data.post);
        setOpen(true);
      },
    },
  );
  const deleteEmptyPostMutation = useMutation(
    (id: string) =>
      axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/v1/posts/${id}`),
    {
      onError: (err) => {
        // An error happened!
        // eslint-disable-next-line no-console
        console.log(`failed to delete`, err);
      },
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log('success delete');
      },
    },
  );

  const handleClose = () => {
    deleteEmptyPostMutation.mutate(newPost.id);
    setOpen(false);
  };

  const putNewPostMutation = useMutation(
    (postReq: PostReq) =>
      axios.put(
        `${process.env.NEXT_PUBLIC_HOST}/api/v1/posts/${postReq.post.id}`,
        postReq,
      ),
    {
      onError: (err) => {
        // An error happened!
        // eslint-disable-next-line no-console
        console.log(`failed to put`, err);
      },
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log('success put');
      },
    },
  );

  const handleClickCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    createEmptyPostMutation.mutate();
  };

  const handleWrite = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);

    putNewPostMutation.mutate({ post: newPost, tags: null });

    void router.push(`/admin/edit/${newPost.permalink}`);
  };

  const handleClick = (selectedData: { selected: number }) => {
    const { selected } = selectedData;
    // 0-indexedなので+1する(サーバーは1ページから始める)
    setPage(selected + 1);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Grid className="w-full m-8">
      <Typography variant="h3">投稿一覧</Typography>
      <Button variant="contained" color="primary" onClick={handleClickCreate}>
        新規作成
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">投稿の初期情報</DialogTitle>
        <DialogContent>
          <DialogContentText>
            投稿のタイトルを設定してください
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title"
            name="title"
            type="text"
            fullWidth
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
            ) => {
              updateField(e);
            }}
          />
          <DialogContentText>
            投稿のpermalinkを設定してください
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="permalink"
            label="permalink"
            name="permalink"
            type="text"
            fullWidth
            onChange={(e) => {
              updateField(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleWrite} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex flex-row">
        <List dense={dense}>
          {data.posts?.map((post) => (
            <AdminArticleList key={post.id} post={post} />
          ))}
        </List>
      </div>
      <ReactPaginate
        previousLabel="prev"
        nextLabel="next"
        breakLabel="..."
        pageCount={data.count ? data.count / 10 : 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handleClick}
        containerClassName="pagination"
        pageLinkClassName="paginate-box"
        breakClassName="paginate-break-box"
        breakLinkClassName="paginate-break"
        nextLinkClassName="paginate-next"
        previousLinkClassName="paginate-prev"
        activeClassName="active"
      />
    </Grid>
  );
};

export default Admin;
