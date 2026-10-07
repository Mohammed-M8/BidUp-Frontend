import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { statusVariants } from "@/lib/helpers/statusVariants";

const AuctionCard = ({ auction }) => (
  <Link to={`/auctions/${auction.id}`} className="shrink-0">
    <Card className="relative aspect-square w-36 gap-0 overflow-hidden py-0 sm:w-40">
      <img
        src={auction.image_url}
        alt={auction.product_name}
        className="absolute inset-0 h-full w-full object-contain"
      />

      {auction.status !== "active" && (
        <Badge
          variant={statusVariants[auction.status] ?? "outline"}
          className="absolute left-2 top-2 capitalize"
        >
          {auction.status}
        </Badge>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-white/80 to-transparent p-2 pt-8 text-black">
        <h3 className="truncate text-sm font-medium">{auction.product_name}</h3>
        <p className="text-sm font-semibold">
          {auction.status === "sold" ? "Sold: " : ""}BD {auction.current_price}
        </p>
      </div>
    </Card>
  </Link>
);

export default AuctionCard