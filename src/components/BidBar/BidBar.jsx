import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function BidBar({ bid, isTop, onAccept }) {
    const auction = bid.auction;

    return (
        <Card className="flex-row items-center justify-between gap-4 px-4 py-3">

            <div className="flex min-w-0 items-center gap-3">
                {auction && (
                    <Link
                        to={`/auctions/${auction.id}`}
                        className="shrink-0"
                    >
                        <img
                            src={auction.image_url}
                            alt={auction.product_name}
                            className="size-24 object-contain"
                        />
                    </Link>
                )}

                <div className="min-w-0">
                    {auction ? (
                        <Link
                            to={`/auctions/${auction.id}`}
                            className="truncate font-medium hover:underline"
                        >
                            {auction.product_name}
                        </Link>
                    ) : (
                        <span className="truncate font-medium">
                            {bid.bidder?.username}
                        </span>
                    )}

                    <div className="flex items-center gap-2">
                        {!auction && (
                            <span className="truncate text-sm text-muted-foreground">
                                {bid.bidder?.username}
                            </span>
                        )}

                        {isTop && (
                            <Badge className="bg-green-600 text-white hover:bg-green-600">
                                Highest
                            </Badge>
                        )}

                        {bid.status && (
                            <Badge
                                variant={bid.status === "won" ? "success" : "destructive"}
                                className="capitalize"
                            >
                                {bid.status}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                    <p className="font-semibold">
                        BD {bid.price}
                    </p>

                    {auction && (
                        <p className="text-xs text-muted-foreground">
                            Current: BD {auction.current_price}
                        </p>
                    )}
                </div>

                {onAccept && (
                    <Button size="sm" onClick={onAccept}>
                        Accept
                    </Button>
                )}
            </div>

        </Card>
    );
}