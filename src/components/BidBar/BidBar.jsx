import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export default function BidBar({ bid, isTop }) {
    return (
        <Card className="flex-row items-center justify-between gap-4 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
                <span className="truncate font-medium">{bid.bidder?.username}</span>
                {isTop && (
                    <Badge className="bg-green-600 text-white hover:bg-green-600">Highest</Badge>
                )}
            </div>
            <p className="shrink-0 font-semibold">BD {bid.price}</p>
        </Card>
    );
}