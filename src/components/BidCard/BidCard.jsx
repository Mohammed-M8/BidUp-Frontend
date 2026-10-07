import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const BADGES = {
  leading: { label: "Leading", variant: "success" },
  won: { label: "Won", variant: "success" },
  outbid: { label: "Outbid", variant: "destructive" },
  lost: { label: "Lost", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "outline" },
};


const BidCard = ({ bid }) => {
  const { auction } = bid;
  const badge = BADGES[bid.status] ?? { label: bid.status, variant: "secondary" };

  return (
    <Link to={`/auctions/${auction.id}`} className="shrink-0">
      <Card className="relative aspect-square w-36 gap-0 overflow-hidden py-0 sm:w-40">
        <img
          src={auction.image_url}
          alt={auction.product_name}
          className="absolute inset-0 h-full w-full object-contain"
        />

        <Badge
          variant={badge.variant}
          className={`absolute left-2 top-2 ${badge.className ?? ""}`}
        >
          {badge.label}
        </Badge>

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-white/90 via-white/70 to-transparent p-2 pt-10 text-black">
          <h3 className="truncate text-sm font-medium">{auction.product_name}</h3>
          <p className="text-sm font-semibold">Your bid: BD {bid.price}</p>
          <p className="text-xs text-black/60">Current: BD {auction.current_price}</p>
        </div>
      </Card>
    </Link>
  );
};

export default BidCard;