import { RouterProvider } from 'react-router-dom';
import { routerConfig } from './routers';

function App() {
  return <RouterProvider router={routerConfig} />;
}

export default App;
