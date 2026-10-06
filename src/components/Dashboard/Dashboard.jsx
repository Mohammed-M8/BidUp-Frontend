import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';
import * as AuctionsService from "../../services/auctionService";
import * as BidsService from '../../services/bidService'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import ComponentScroller from '../ComponentScroller/ComponentScroller';
import AuctionCard from '../AuctionCard/AuctionCard';
import BidCard from '../BidCard/BidCard';
import { Separator } from '../ui/separator';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [auctions, setAuctions] = useState({
    items: [],
    total: 0,
    page: 1,
    page_size: 10,
    pages: 0,
  });
  const [bids, setBids] = useState({
    items: [],
    total: 0,
    page: 1,
    page_size: 10,
    pages: 0,
  });


  useEffect(() => {
    async function getUserAuctions() {
      try {
        const data = await AuctionsService.getUserAuctions(user.sub, 1, 10)
        setAuctions(data)
      } catch (error) {
        toast.error(getApiError(error))
      }
    }

    getUserAuctions()
  }, [user])


  useEffect(() => {
    async function getUserBids() {
      try {
        const data = await BidsService.getUserBids(user.sub, 1, 10)
        setBids(data)
      } catch (error) {
        toast.error(getApiError(error))
      }
    }

    getUserBids()
  }, [user])

  return (
    <main className="space-y-4 px-4 py-12">
      <h1 className='text-5xl'>Hello, {user.username}</h1>
      <Separator />
      <h1 className="text-3xl">Your Auctions</h1>
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription>View your auctions</CardDescription>
          <Button size="sm" asChild>
            <Link to="/my/auctions">View all</Link>
          </Button>
        </CardHeader>

        <CardContent className="min-w-0">
          <ComponentScroller>
            {auctions.items.length ? auctions.items.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            )) : <p>No Auctions</p>}
          </ComponentScroller>
        </CardContent>
      </Card>
      <Separator />
      <h1 className="text-3xl">Your Bids</h1>
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription>View your bids</CardDescription>
          <Button size="sm" asChild>
            <Link to="/my/bids">View all</Link>
          </Button>
        </CardHeader>

        <CardContent className="min-w-0">
          <ComponentScroller>
            {bids.items.length ? bids.items.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            )) : <p>No Bids</p>}
          </ComponentScroller>
        </CardContent>
      </Card>
    </main>
  );
};

export default Dashboard;
