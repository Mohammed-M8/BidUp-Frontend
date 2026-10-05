import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import { Button, buttonVariants } from '@/components/ui/button';
import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../lib/helpers/jwt-helpers';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    removeToken();
    setUser(null);
    navigate('/');
  };

  return (
    <header className="border-b bg-background">
      <nav className="flex h-14 items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold">
          BidUp
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="mr-2 text-sm text-muted-foreground">
                Hello, {user.username}
              </span>
              <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
                Dashboard
              </Link>
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