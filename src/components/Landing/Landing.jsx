import { useContext } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { UserContext } from '../../contexts/UserContext';
import LiveAuctions from '../LiveAuctions/LiveAuctions';



const LandingPage = () => {
  const { user } = useContext(UserContext);


  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            {user ? `Welcome back, ${user.username}` : 'Welcome to BidUp'}
          </CardTitle>
          <CardDescription>
            Bid on live auctions, or list your own and watch the price climb in real time.
          </CardDescription>
        </CardHeader>
      </Card>

      {!user && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Already have an account? Pick up where you left off.
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-auto">
              <Button variant='secondary' asChild className="w-full">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                New here? Create an account to start bidding.
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-auto">
              <Button asChild className="w-full">
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <LiveAuctions />


    </div>
  );
};

export default LandingPage;