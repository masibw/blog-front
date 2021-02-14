import React, {
  createContext,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Button, TextField } from '@material-ui/core';
import { useMutation } from 'react-query';

import axios from 'axios';
import { useRouter } from 'next/router';

type LoginContext = {
  loginState: boolean;
  updateLoginState: (state: boolean) => void;
};

export const LoginContext = createContext<LoginContext>({} as LoginContext);

export const LoginProvider: FC = ({ children }) => {
  const [loginState, setLoginState] = useState<boolean>(false);

  const updateLoginState = useCallback((state: boolean) => {
    setLoginState(state);
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loginState,
        updateLoginState,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useRequireLogin = (): void => {
  const { loginState } = useContext(LoginContext);
  const router = useRouter();
  useEffect(() => {
    if (!loginState) void router.push('/login');
  }, [loginState, router]);
};

const Login: FC = () => {
  const { loginState, updateLoginState } = useContext<LoginContext>(
    LoginContext,
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  useEffect(() => {
    if (loginState) void router.push('/admin');
  }, [loginState, router]);

  const mutation = useMutation(
    (formData) =>
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/v1/login`, formData),
    {
      onError: (error) => {
        // An error happened!
        // eslint-disable-next-line no-console
        console.log(`failed to login`, error);
      },
      onSuccess: () => {
        updateLoginState(true);
      },
    },
  );
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ mailAddress: email, password });
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        method="POST"
        noValidate
        className="flex flex-col justify-center m-auto w-1/4 mb-8 "
      >
        <TextField
          label="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="パスワード"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          ログイン
        </Button>
      </form>
    </>
  );
};

export default Login;
