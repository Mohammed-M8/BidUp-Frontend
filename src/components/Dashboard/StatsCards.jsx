import { Gavel, HandCoins, Clock, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useState } from 'react';

const StatCard = ({ title, value, icon: Icon, hint }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>{title}</CardDescription>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <CardTitle className="text-2xl">{value}</CardTitle>
            {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
        </CardContent>
    </Card>
);

const StatsCards = ({ auctions, bids }) => {
    const [now] = useState(() => Date.now());

    const endingSoon = auctions.items.filter((a) => {
        const diff = new Date(a.end_time).getTime() - now;
        return diff > 0 && diff < 24 * 60 * 60 * 1000;
    }).length;

    const wins = bids.items.filter((b) => b.status === 'won').length;

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Your Auctions" value={auctions.total} icon={Gavel} hint="Total created" />
            <StatCard title="Your Bids" value={bids.total} icon={HandCoins} hint="Total placed" />
            <StatCard title="Ending Soon" value={endingSoon} icon={Clock} hint="Next 24 hours" />
            <StatCard title="Wins" value={wins} icon={Trophy} hint="From recent bids" />
        </div>
    );
};

export default StatsCards;