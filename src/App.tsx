import { FC } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import RoutesConfig from '@/route';
import theme from '@/style/theme.json';

import './App.scss';

const App: FC = () => {
  const Routes = () => {
    let routes = useRoutes(RoutesConfig);
    return routes;
  };
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
