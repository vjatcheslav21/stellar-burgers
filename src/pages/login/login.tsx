import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '@hooks';
import { loginUser } from '@thunks/userThunk';
import { userSelectors } from '@slices/userSlice/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userIsLoading = useSelector(userSelectors.userIsLoadingSelect);
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    try {
      await dispatch(
        loginUser({
          email,
          password
        })
      ).unwrap();
    } catch (err) {
      setError('Ошибка авторизации. Проверьте введенные данные.');
    }
  };

  if (userIsLoading) {
    return <Preloader />;
  }
  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
