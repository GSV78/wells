import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthDispachType, authSuccess } from '../redux/authReducer';
import styles from './Auth.module.css';

let cx = classNames.bind(styles);

function Auth() {
  const dispatch: AuthDispachType = useDispatch();

  const [pass, setPass] = useState('');
  const onChange = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setPass(target.value);
  };
  const [error, setError] = useState(false);
  const onInputPass = () => {
    pass === 'yoyoyo' ? dispatch(authSuccess()) : setError(true);
  };
  return (
    <div className={cx('auth')}>
      <h2>Введите пароль:</h2>
      <div>
        <input type="text" onChange={onChange} value={pass} />
        <button onClick={onInputPass}>Go!</button>
      </div>
      <div className={cx('errors', { invisible: !error })}>'Не правильно!'</div>
    </div>
  );
}

export default Auth;
