import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import * as AuctionService from "../../services/auctionService";
import { Spinner } from "../ui/spinner";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAuctionSocket } from "../../../hooks/useAuctionSocket";
import { BidForm } from "../BidForm/BidForm";
import { createBid } from "@/services/bidService";

export default function Auction() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false)
    const [buyNow, setBuyNow] = useState(false)

    useEffect(() => {
        async function getAuction() {
            try {
                const data = await AuctionService.getAuction(auctionId);
                setAuction(data);
            } catch (error) {
                toast.error(error.message);
            }
        }

        getAuction();
    }, [auctionId]);

    useAuctionSocket(auctionId, (message) => {
        if (message.type === "new_bid") {
            if (message.ended) toast.info("Auction has ended!")
            setAuction((prev) => prev && {
                ...prev,
                current_price: message.price,
                status: message.ended ? "ended" : prev.status,
            })
        } else if (message.type === "auction_ended") {
            toast.info("Auction has ended!")
            setAuction((prev) => prev && { ...prev, status: "ended" })
        } else if (message.type === "auction_cancelled") {
            toast.error("The seller cancelled this auction")
            setAuction((prev) => prev && { ...prev, status: "cancelled" })
        }
    })


    if (!auction) {
        return <Spinner className="mx-auto mt-20 size-8" />;
    }

    const placeBid = async (price) => {

        await createBid(auction.id, price)
    }

    const ended = auction.status === "ended" || auction.status === "cancelled"

    return (
        <main className="px-4 py-4">
            <h1 className="text-2xl">View Auction</h1>

            <Card className="relative mx-auto mt-4 max-w-6xl">

                <CardContent className="flex gap-8 p-6">

                    <div className="w-2/5 shrink-0">
                        <div className="aspect-square overflow-hidden rounded-lg">
                            <img
                                src={auction.image_url}
                                alt={auction.product_name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                    <Card className="relative flex-1">
                        <span className="absolute right-6 top-6 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                            {auction.status}
                        </span>
                        <CardContent className="flex h-full flex-col gap-5 p-6">

                            <div>
                                <h1 className="text-3xl font-bold">
                                    {auction.product_name}
                                </h1>

                                <p className="mt-3 text-muted-foreground">
                                    {auction.product_description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Category
                                    </p>
                                    <p className="font-medium">
                                        {auction.category?.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Seller
                                    </p>
                                    <p className="font-medium">
                                        {auction.seller?.username}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Current price
                                </p>
                                <p className="text-3xl font-bold">
                                    BD {auction.current_price}
                                </p>
                            </div>

                            <div className="flex gap-8">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Starting price
                                    </p>
                                    <p>BD {auction.starting_price}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Buy now
                                    </p>
                                    <p>BD {auction.buy_now_price}</p>
                                </div>
                            </div>

                            {!ended && <div className="mt-auto flex gap-3">
                                <Button className="flex-1" onClick={() => { setBuyNow(false); setDialogOpen(true) }}>
                                    Place Bid
                                </Button>

                                <Button variant="outline" className="flex-1" onClick={() => { setBuyNow(true); setDialogOpen(true) }}>
                                    Buy Now
                                </Button>
                            </div>}

                        </CardContent>
                    </Card>

                </CardContent>
            </Card>
            <BidForm key={buyNow?"buyNow":"bidPrice"} open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={placeBid} minPrice={auction.current_price}     buyNowPrice={buyNow ? auction.buy_now_price : undefined}
 />
        </main>
    );
}