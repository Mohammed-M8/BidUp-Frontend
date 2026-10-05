import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';
import * as AuctionsService from "../../services/auctionService";
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [auctions, setAuctions] = useState([])



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
    <main className="flex-row px-4 py-12">
      <h1 className='text-3xl'>
        Your Auctions
      </h1>
      <Card>
        <CardHeader>
          <CardDescription>
            <div className='flex items-center justify-between'><span>View your auctions</span>
              <Button size='xs'><Link to='auctions'>View all</Link></Button>
            </div>
          </CardDescription>
          <CardContent>
            {auctions.map(a => a.product_name)}
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
};

export default Dashboard;
