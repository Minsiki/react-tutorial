import { Route, Routes } from 'react-router-dom';
import './App.css';
import NewsPage from './pages/NewsPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path=":category" element={<NewsPage />} />
      </Routes>
    </div>
  );
};

export default App;
