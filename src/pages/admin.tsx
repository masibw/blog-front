import { FC } from 'react';
import { useRequireLogin } from './login';

const Admin: FC = () => {
  useRequireLogin();

  return <p> admin page</p>;
};

export default Admin;
