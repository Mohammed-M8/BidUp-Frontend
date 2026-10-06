import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function BidBar({ bid, isTop, onAccept }) {
    return (
        <Card className="flex-row items-center justify-between gap-4 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
                <span className="truncate font-medium">{bid.bidder?.username}</span>
                {isTop && (
                    <Badge className="bg-green-600 text-white hover:bg-green-600">Highest</Badge>
                )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
                <p className="font-semibold">BD {bid.price}</p>
                {onAccept && <Button size="sm" onClick={onAccept}>Accept</Button>}
            </div>
        </Card>
    );
}