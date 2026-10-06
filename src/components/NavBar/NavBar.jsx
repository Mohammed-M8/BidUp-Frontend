import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Button, buttonVariants } from '@/components/ui/button';
import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../lib/helpers/jwt-helpers';
import { getCategories } from '@/services/categoryService';
import AuctionMenu from '../AuctionMenu/AuctionMenu';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();

  const handleSignOut = () => {
    removeToken();
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getCategories()
      setCategories(data)
    }
    getData()
  }, [])

  return (
    <header className="border-b bg-background">
      <nav className="flex h-14 items-center justify-between px-4">
        <Link to="/" className="text-4xl font-[Geo] font-semibold">
          BidUp
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>

              <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
                Dashboard
              </Link>
              <AuctionMenu categories={categories} />
              <Link to="/my/auctions" className={buttonVariants({ variant: 'ghost' })}>My Auctions</Link>
              <Link to="/my/bids" className={buttonVariants({ variant: 'ghost' })}>My Bids</Link>
              <span className="mr-2 text-sm text-muted-foreground">
                Hello, {user.username}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
                Home
              </Link>
              <Link to="/sign-in" className={buttonVariants({ variant: 'ghost' })}>
                Sign In
              </Link>
              <Link to="/sign-up" className={buttonVariants()}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;