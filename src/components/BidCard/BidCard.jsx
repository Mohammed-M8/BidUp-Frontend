import { Card, CardContent } from "../ui/card";

const AuctionCard = ({ auction }) => (
  <Card className="w-48 min-w-48 overflow-hidden">
    <img
      src={auction.image_url}
      alt={auction.product_name}
      className="aspect-square w-full object-cover"
    />

    <CardContent className="p-3">
      <h3 className="truncate font-medium">
        {auction.product_name}
      </h3>

      <p className="text-sm text-muted-foreground">
        Current price
      </p>

      <p className="font-semibold">
        BD {auction.current_price}
      </p>
    </CardContent>
  </Card>
);


export default AuctionCard