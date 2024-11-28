// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CreateCustomPage from './Page/CreateCustomPage/CreateCustomPage';
import PageList from './Page/Post/PageList';
import CategoryPage from './Page/CategoryPage/CategoryPage';
import FullBlog from './Page/FullBlog/FullBlog';
import UpdatePost from './Page/UpdateBus/UpdatePost';
import SubCategoryPage from './Page/SubCategoryPage/SubCategoryPage';
import InstantIndexing from './Page/InstantIndexing/InstantIndexing';



const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-custom-page/:id" element={<CreateCustomPage />} />
          <Route path="/update-custom-page/:id" element={<UpdatePost />} />
          <Route path="/page-list" element={<PageList />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/sub-category/:id" element={<SubCategoryPage />} />
          <Route path="/fullBlog/:id" element={<FullBlog />} />
          <Route path="/instant-indexing" element={< InstantIndexing />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  );
};

export default App;
