import 'antd/dist/antd.css';
import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import { AppStateType } from './redux/store';
import Start from './pages/Start';

function App() {
  const isAuth = useSelector((state: AppStateType) => {
    return state.auth.isAuth;
  });
  return isAuth ? <Start /> : <Auth />;
}

export default App;
