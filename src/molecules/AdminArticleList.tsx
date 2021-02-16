import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { FC } from 'react';
import Link from 'next/link';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Post } from '../domains/models/post';

const AdminArticleList: FC<{ post: Post }> = ({ post }) => {
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
        // TODO 一覧データを更新する必要がある
        // eslint-disable-next-line no-console
        console.log('success delete');
      },
    },
  );

  const handleDelete = () => {
    deleteEmptyPostMutation.mutate(post.id);
  };

  return (
    <Link href={{ pathname: `/admin/edit/${post.permalink}` }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${post.title}`} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  );
};

export default AdminArticleList;
