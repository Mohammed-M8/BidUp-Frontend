import { useContext } from 'react';
import { Route, Routes } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'

// Context
import { UserContext } from './contexts/UserContext';
import Auction from './components/Auction/Auction';

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavBar />
      {user ?
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='my'>

          </Route>
          <Route path='auctions'>
            <Route index />
            <Route path=':auctionId' element={<Auction />} />
          </Route>
        </Routes>
        : <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
        </Routes>}
    </>
  );
};

export default App;
