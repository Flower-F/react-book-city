import { RouterProvider } from 'react-router-dom';
import { routerConfig } from './routers';

const App = () => {
  return <RouterProvider router={routerConfig} />;
};

export default App;
