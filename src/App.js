import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
import EmailSender from './pages/EmailSender/EmailSender';
import ErrorHandlerWrapper from './ErrorHandler/ErrorHandlerWrapper';
import NewBid from './pages/NewBid/NewBid';
import Settings from './pages/Settings/Settings';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Bid from './pages/Bid/Bid';
import Search from './pages/Search/Search';
import Book from './pages/Book/Book';
import Admin from './pages/Admin/Admin';
import FullPresentation from './pages/FullPresentation/FullPresentation';

// Manage routing
function App() {
  return (
    <Router>
      <ErrorHandlerWrapper>
        <Routes>
          <Route path='/' default element={<Home />} />
          <Route path='/login' element={<Auth startingMode='login' />} />
          <Route path='/register' element={<Auth startingMode='register' />} />
          <Route path='/confirm-email/:action' element={<EmailSender />} />
          <Route
            path='/confirm-email/email-token/:emailToken'
            element={<EmailConfirmation />}
          />
          <Route path='/user/:username' element={<Profile />} />
          <Route path='/user/:username/edit' element={<Settings />} />
          <Route
            path='/user/:username/edit/change-password'
            element={<ChangePassword />}
          />
          <Route
            path='/user/:username/edit/change-password/:emailToken'
            element={<ChangePassword />}
          />
          <Route path='/new-bid' element={<NewBid />} />
          <Route path='/ad/:uuid' element={<Bid />} />
          <Route path='/book/:uuid' element={<Book />} />
          <Route path='/search' element={<Search />} />
          {/* Admin Section */}
          <Route path='/admin/clean/books/isbn' element={<Admin />} />
          {/*Landing page*/}
          <Route path='/presentation' element={<FullPresentation />} />
        </Routes>
      </ErrorHandlerWrapper>
    </Router>
  );
}

export default App;
