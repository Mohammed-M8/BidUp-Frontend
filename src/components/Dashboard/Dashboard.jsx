import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';
import * as AuctionsService from "../../services/auctionService";
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import ComponentScroller from '../ComponentScroller/ComponentScroller';
import AuctionCard from '../AuctionCard/AuctionCard';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [auctions, setAuctions] = useState({
    items: [],
    total: 0,
    page: 1,
    page_size: 10,
    pages: 0,
  });


  useEffect(() => {
    console.log(user)
    async function getUserAuctions() {
      try {
        const data = await AuctionsService.getUserAuctions(user.sub)
        setAuctions(data)
        console.log(data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    getUserAuctions()
  }, [user])

return (
  <main className="space-y-4 px-4 py-12">
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
          {auctions.items.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </ComponentScroller>
      </CardContent>
    </Card>
  </main>
);
};

export default Dashboard;
