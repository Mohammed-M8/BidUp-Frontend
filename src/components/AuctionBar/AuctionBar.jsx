import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

const timeLeft = (endDate) => {
    const ms = new Date(endDate) - new Date();
    if (ms <= 0) return "Ended";
    const mins = Math.floor(ms / 60000);
    const days = Math.floor(mins / 1440);
    const hours = Math.floor((mins % 1440) / 60);
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${mins % 60}m left`;
    return `${mins}m left`;
};

export default function AuctionBar({ auction }) {
    const msLeft = new Date(auction.end_date) - new Date();
    const urgent = msLeft > 0 && msLeft < HOUR_MS;
    const isNew = new Date() - new Date(auction.created_at) < DAY_MS;
    const hasBids = auction.current_price > auction.starting_price;

    return (
        <Link to={`/auctions/${auction.id}`} className="block w-full">
            <Card className="flex-row items-center gap-4 overflow-hidden py-0 transition-colors hover:bg-muted/50">
                <img
                    src={auction.image_url}
                    alt={auction.product_name}
                    className="size-24 shrink-0 object-contain sm:size-28"
                />

                <div className="min-w-0 flex-1 py-2">
                    <div className="flex items-center gap-2">
                        <h3 className="truncate font-medium">{auction.product_name}</h3>
                        {isNew && <Badge className="shrink-0">New</Badge>}
                    </div>

                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {auction.product_description}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                        {auction.category?.name}
                        {auction.category && auction.seller && " · "}
                        {auction.seller && `by ${auction.seller.username}`}
                    </p>
                </div>

                <div className="shrink-0 pr-4 text-right">
                    <p className="text-xs text-muted-foreground">
                        {hasBids ? "Current bid" : "Starting price"}
                    </p>
                    <p className="text-lg font-semibold">BD {auction.current_price}</p>

                    {auction.buy_now_price != null && (
                        <p className="text-xs text-muted-foreground">
                            Buy now BD {auction.buy_now_price}
                        </p>
                    )}

                    <p className={`text-xs ${urgent ? "font-medium text-destructive" : "text-muted-foreground"}`}>
                        {timeLeft(auction.end_date)}
                    </p>
                </div>
            </Card>
        </Link>
    );
}