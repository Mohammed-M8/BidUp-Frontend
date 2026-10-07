import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import * as AuctionService from "../../services/auctionService";
import * as BidService from "../../services/bidService";
import { Spinner } from "../ui/spinner";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAuctionSocket } from "../../../hooks/useAuctionSocket";
import { BidForm } from "../BidForm/BidForm";
import { createBid } from "@/services/bidService";
import ComponentScroller from "../ComponentScroller/ComponentScroller";
import BidBar from "../BidBar/BidBar";
import { UserContext } from "@/contexts/UserContext";
import { AcceptForm } from "../AcceptForm/AcceptForm";
import { CancelForm } from "../CancelForm/CancelForm";
import { getApiError } from "@/lib/helpers/getApiError";
import { EditAuctionForm } from "../EditAuctionForm/EditAuctionForm";
import Breadcrumbs from "../BreadCrumb/BreadCrumb";
import { Badge } from "../ui/badge";
import { statusVariants } from "@/lib/helpers/statusVariants";



export default function Auction() {

    const { user } = useContext(UserContext)
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false)
    const [cancelOpen, setCancelOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [bidToAccept, setBidToAccept] = useState(null)
    const [buyNow, setBuyNow] = useState(false)
    const [bids, setBids] = useState([])

    useEffect(() => {
        async function getAuction() {
            try {
                const data = await AuctionService.getAuction(auctionId);
                setAuction(data);
            } catch (error) {
                toast.error(getApiError(error));
            }
        }

        getAuction();
    }, [auctionId]);

    useEffect(() => {
        const getBids = async () => {
            try {
                const data = await BidService.getAuctionBids(auctionId)
                setBids(data.items)
            } catch (error) {
                toast.error(getApiError(error))
            }
        }
        getBids()
    }, [auctionId])



    useAuctionSocket(auctionId, (message) => {
        if (message.type === "new_bid") {
            if (message.ended) toast.info("Auction has ended!")

            setBids((prev) => [
                { id: message.bid_id, price: message.price, bidder: message.bidder },
                ...prev,
            ])

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
        } else if (message.type === "bid_accepted") {
            toast.success(`Seller accepted ${message.bidder.username}'s bid of BD ${message.price}`)
            setAuction((prev) => prev && { ...prev, status: "ended" })
        }
    })


    if (!auction) {
        return <Spinner className="mx-auto mt-20 size-8" />;
    }

    const winner = auction.status === "ended" ? bids[0] : null

    const isSeller = user && Number(user.sub) === auction.seller_id

    const acceptBid = async () => {
        try {
            await BidService.acceptBid(bidToAccept.id)
            setBidToAccept(null)
        } catch (error) {
            toast.error(getApiError(error))
        }
    }

    const placeBid = async (price) => {
        try {
            await createBid(auction.id, price)

        } catch (error) {
            toast.error(getApiError(error))

        }
    }

    const handleCancel = async (reason) => {
        try {
            await AuctionService.cancelAuction(auction.id, reason)
        } catch (error) {
            toast.error(getApiError(error))
        } finally {
            setCancelOpen(false)
        }
    }

    const handleUpdate = async (formData) => {
        const updated = await AuctionService.updateAuction(auction.id, formData)
        setAuction(updated)
        toast.success("Auction updated")
    }

    const ended = auction.status === "ended" || auction.status === "cancelled"||auction.status=="sold"

    return (
        <main className="px-4 py-4">
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "Auctions", href: "/auctions" },
                    { label: auction.product_name },
                ]}
            />
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
                        <Badge variant={statusVariants[auction.status] ?? "outline"} className="absolute right-6 top-6 capitalize">
                            {auction.status}
                        </Badge>
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
                            {auction.status === "ended" && (
                                winner
                                    ? <p className="font-medium">Sold to {winner.bidder?.username} for BD {winner.price}</p>
                                    : <p className="text-muted-foreground">Ended with no bids</p>
                            )}

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

                            {!ended && !isSeller ? <div className="mt-auto flex gap-3">
                                <Button className="flex-1" onClick={() => { setBuyNow(false); setDialogOpen(true) }}>
                                    Place Bid
                                </Button>

                                <Button variant="outline" className="flex-1" onClick={() => { setBuyNow(true); setDialogOpen(true) }}>
                                    Buy Now
                                </Button>
                            </div> : isSeller && !ended ? (
                                <div className="mt-auto flex gap-3">
                                    {bids.length === 0 && (
                                        <Button variant="secondary" className="flex-1" onClick={() => setEditOpen(true)}>
                                            Edit Auction
                                        </Button>
                                    )}
                                    <Button variant="destructive" className="flex-1" onClick={() => setCancelOpen(true)}>
                                        Cancel Auction
                                    </Button>
                                </div>
                            ) : null}
                        </CardContent>
                    </Card>

                </CardContent>
            </Card>
            <section className="mx-auto mt-6 max-w-6xl space-y-3">
                <h2 className="text-xl font-semibold">Bids ({bids.length})</h2>

                {bids.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No bids yet.</p>
                ) : (
                    <ComponentScroller orientation="vertical">
                        {bids.map((bid, i) => (
                            <BidBar
                                key={bid.id}
                                bid={bid}
                                isTop={i === 0}
                                onAccept={isSeller && !ended && i === 0 ? () => setBidToAccept(bid) : undefined} />
                        ))}
                    </ComponentScroller>
                )}
            </section>
            <BidForm key={buyNow ? "buyNow" : "bidPrice"} open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={placeBid} minPrice={auction.current_price} buyNowPrice={buyNow ? auction.buy_now_price : undefined}
            />
            <AcceptForm
                open={bidToAccept !== null}
                onOpenChange={(open) => { if (!open) setBidToAccept(null) }}
                bid={bidToAccept}
                onConfirm={acceptBid}
            />
            {isSeller && (<>
                <CancelForm open={cancelOpen} onOpenChange={setCancelOpen} onConfirm={handleCancel} />

                <EditAuctionForm
                    key={auction.id + String(editOpen)}
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    auction={auction}
                    onSubmit={handleUpdate}
                />
            </>
            )}
        </main>
    );
}