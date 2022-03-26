import 'antd/dist/antd.css';
import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import { AppStateType } from './redux/store';
import Start from './pages/Start';

function App() {
  const isAuth = useSelector((state: AppStateType) => {
    return state.auth.isAuth;
  });
  return true ? <Start /> : <Auth />; // заменить true на isAuth чтобы включить ввод пароля
}

export default App;
