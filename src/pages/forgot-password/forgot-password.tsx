import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '@hooks';
import { forgotPassword } from '@thunks/userThunk';
import { userSelectors } from '@slices/userSlice/userSlice';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIsLoading = useSelector(userSelectors.userIsLoadingSelect);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(forgotPassword(email)).unwrap();
      localStorage.setItem('resetPassword', 'true');
      navigate('/reset-password', { replace: true });
    } catch (err) {
      setError('Ошибка. Проверьте введенные данные.');
    }
  };

  if (userIsLoading) {
    return <Preloader />;
  }

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
