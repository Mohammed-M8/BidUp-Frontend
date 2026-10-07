import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { useNow } from "../../../hooks/useNow"; // wherever you saved it
import { auctionStatusVariants } from "@/lib/helpers/statusVariants";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

const timeLeft = (endDate, now) => {
    const ms = new Date(endDate).getTime() - now;
    if (ms <= 0) return "Ended";
    const mins = Math.floor(ms / 60000);
    const days = Math.floor(mins / 1440);
    const hours = Math.floor((mins % 1440) / 60);
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${mins % 60}m left`;
    return `${mins}m left`;
};

export default function AuctionBar({ auction }) {
    const now = useNow(60_000);

    const isActive = auction.status === "active";
    const isSold = auction.status === "sold";
    const msLeft = new Date(auction.end_date).getTime() - now;
    const urgent = isActive && msLeft > 0 && msLeft < HOUR_MS;
    const isNew = isActive && now - new Date(auction.created_at).getTime() < DAY_MS;
    const hasBids = auction.current_price > auction.starting_price;

    const priceLabel = isSold ? "Sold for" : hasBids ? "Current bid" : "Starting price";
    const footer = isActive ? timeLeft(auction.end_date, now) : null;

    return (
        <Link to={`/auctions/${auction.id}`} className="block w-full">
            <Card className="flex-row items-center gap-4 overflow-hidden py-0 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-2">
                    <h3 className="truncate font-medium">{auction.product_name}</h3>
                    {isNew && <Badge className="shrink-0">New</Badge>}
                    {!isActive && (
                        <Badge
                            variant={auctionStatusVariants[auction.status] ?? "outline"}
                            className="shrink-0 capitalize"
                        >
                            {auction.status}
                        </Badge>
                    )}
                </div>

                {/* right column */}
                <div className="shrink-0 pr-4 text-right">
                    <p className="text-xs text-muted-foreground">{priceLabel}</p>
                    <p className="text-lg font-semibold">BD {auction.current_price}</p>

                    {isActive && auction.buy_now_price != null && (
                        <p className="text-xs text-muted-foreground">
                            Buy now BD {auction.buy_now_price}
                        </p>
                    )}

                    {footer && (
                        <p className={`text-xs ${urgent ? "font-medium text-destructive" : "text-muted-foreground"}`}>
                            {footer}
                        </p>
                    )}
                </div>
            </Card>
        </Link>
    );
}