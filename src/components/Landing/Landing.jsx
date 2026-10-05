import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

import { getAuctions } from '@/services/auctionService'; // adjust to where getAuctions lives
import { UserContext } from '../../contexts/UserContext';

const timeLeft = (endDate) => {
  const ms = new Date(endDate) - new Date();
  if (ms <= 0) return 'Ended';
  const mins = Math.floor(ms / 60000);
  const days = Math.floor(mins / 1440);
  const hours = Math.floor((mins % 1440) / 60);
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${mins % 60}m left`;
  return `${mins}m left`;
};

const AuctionRow = ({ auction }) => (
  <Link to={`/auctions/${auction.id}`} className="block">
    <Card className="transition-colors hover:bg-muted/50">
      <CardContent className="flex items-center gap-4 p-3">
        <img
          src={auction.image_url}
          alt={auction.product_name}
          className="h-16 w-16 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{auction.product_name}</p>
          <div className="mt-1 flex items-center gap-2">
            {auction.category && <Badge variant="secondary">{auction.category.name}</Badge>}
            <span className="text-xs text-muted-foreground">{timeLeft(auction.end_date)}</span>
          </div>
        </div>
        <p className="shrink-0 text-lg font-semibold">${auction.current_price}</p>
      </CardContent>
    </Card>
  </Link>
);

const AuctionRowSkeleton = () => (
  <Card>
    <CardContent className="flex items-center gap-4 p-3">
      <Skeleton className="h-16 w-16 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-6 w-14" />
    </CardContent>
  </Card>
);

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAuctions(null, 1, 12);
        setAuctions(data.items);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      {/* Welcome */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            {user ? `Welcome back, ${user.username}` : 'Welcome to CarBid'}
          </CardTitle>
          <CardDescription>
            Bid on live auctions, or list your own and watch the price climb in real time.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Sign in / Sign up (guests only) */}
      {!user && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Already have an account? Pick up where you left off.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>New here? Create an account to start bidding.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Live auctions */}
      <Card>
        <CardHeader>
          <CardTitle>Live Auctions</CardTitle>
          <CardDescription>Ending soonest first.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 pr-3">
            <div className="space-y-3">
              {loading &&
                Array.from({ length: 4 }).map((_, i) => <AuctionRowSkeleton key={i} />)}

              {!loading && auctions.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No live auctions right now. Check back soon.
                </p>
              )}

              {!loading && auctions.map((a) => <AuctionRow key={a.id} auction={a} />)}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;