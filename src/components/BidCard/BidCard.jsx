import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const BADGES = {
  leading:   { label: "Leading",   className: "bg-green-600 text-white hover:bg-green-600" },
  won:       { label: "Won",       className: "bg-green-600 text-white hover:bg-green-600" },
  outbid:    { label: "Outbid",    variant: "destructive" },
  lost:      { label: "Lost",      variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "outline" },
};

const BidCard = ({ bid }) => {
  const { auction } = bid;
  const badge = BADGES[bid.status] ?? { label: bid.status, variant: "secondary" };

  return (
    <Link to={`/auctions/${auction.id}`} className="shrink-0">
      <Card className="w-48 min-w-48 gap-0 overflow-hidden py-0">
        <div className="relative">
          <img
            src={auction.image_url}
            alt={auction.product_name}
            className="aspect-square w-full object-cover"
          />
          <Badge
            variant={badge.variant}
            className={`absolute left-2 top-2 ${badge.className ?? ""}`}
          >
            {badge.label}
          </Badge>
        </div>

        <CardContent className="p-3">
          <h3 className="truncate font-medium">{auction.product_name}</h3>

          <p className="text-sm text-muted-foreground">Your bid</p>
          <p className="font-semibold">BD {bid.price}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Current: BD {auction.current_price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BidCard;