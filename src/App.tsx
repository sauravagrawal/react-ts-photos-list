import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ListPage from './pages/ListPage';


const App = () => {
  return (
    <>
 <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </>
    </BrowserRouter>
    </>
  );
};

export default App;
