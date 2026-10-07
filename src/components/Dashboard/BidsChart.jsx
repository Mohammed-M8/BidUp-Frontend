// components/Dashboard/BidsChart.jsx
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const fmt = (v) => `BD${Number(v).toLocaleString()}`;
const chartConfig = {
    price: { label: 'Bid price', color: 'var(--chart-1)' },
};

const BidsChart = ({ bids }) => {
    const data = useMemo(
        () =>
            [...bids.items]
                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                .map((b) => ({
                    date: new Date(b.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                    }),
                    price: b.price,
                })),
        [bids.items]
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Bids</CardTitle>
                <CardDescription>Prices of your latest bids</CardDescription>
            </CardHeader>
            <CardContent>
                {data.length ? (
                    <ChartContainer config={chartConfig} className="h-62.5 w-full">
                        <BarChart data={data} margin={{ top: 20 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={60}
                                tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={(value) => (
                                            <span className="font-mono font-medium">{fmt(value)}</span>
                                        )}
                                    />
                                }
                            />
                            <Bar dataKey="price" fill="var(--color-price)" radius={4}>
                                <LabelList
                                    dataKey="price"
                                    position="top"
                                    offset={8}
                                    className="fill-foreground"
                                    fontSize={12}
                                    formatter={fmt}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                ) : (
                    <p className="text-muted-foreground">No bid data yet</p>
                )}
            </CardContent>
        </Card>
    );
};
export default BidsChart;