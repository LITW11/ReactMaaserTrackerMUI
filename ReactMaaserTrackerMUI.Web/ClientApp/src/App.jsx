import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomePage from './pages/HomePage';
import IncomePage from './pages/IncomePage';
import MaaserPage from './pages/MaaserPage';
import OverviewPage from './pages/OverviewPage';
import AddIncomePage from './pages/AddIncomePage';
import AddMaaserPage from './pages/AddMaaserPage';

import Layout from './components/Layout';
import ManageSourcesPage from './pages/ManageSourcesPage';

const App = () => {
  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/maaser" element={<MaaserPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/add-income" element={<AddIncomePage />} />
          <Route path="/add-maaser" element={<AddMaaserPage />} />
          <Route path="/manage-sources" element={<ManageSourcesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
