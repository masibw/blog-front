import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';

const AdminBreadcrumbs: FC<{ permalink: string }> = ({ permalink }) => {
  const router = useRouter();
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
    void router.push('/admin');
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/admin" onClick={handleClick}>
        admin
      </Link>
      <Typography color="textPrimary">{permalink}</Typography>
    </Breadcrumbs>
  );
};

export default AdminBreadcrumbs;
