import { UserContext } from "@/contexts/UserContext"
import { getApiError } from "@/lib/helpers/getApiError"
import { getUserBids } from "@/services/bidService"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { Spinner } from "../ui/spinner"
import ComponentScroller from "../ComponentScroller/ComponentScroller"
import BidBar from "../BidBar/BidBar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useSearchParams } from "react-router"
import Breadcrumbs from "../BreadCrumb/BreadCrumb"

export default function MyBids() {
    const { user } = useContext(UserContext)
    const [bids, setBids] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.get("status")

    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            try {
                const data = await getUserBids(user.sub, page, 12, status)
                setBids(data.items)
                setPages(data.pages)
            } catch (error) {
                toast.error(getApiError(error))
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [user, page, status])

    const goTo = (evt, target) => {
        evt.preventDefault()
        if (target >= 1 && target <= pages) setPage(target)
    }
    const items = [
        { label: "All Bids", value: '' },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" }
    ]

    return (
        <main className="space-y-4 px-4 py-4">
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "My Bids" },
                ]}
            />
            <div className="flex flex-row items-center gap-4">
                <h1 className="text-3xl">Your Bids</h1>

                <Select
                    value={status || ""}
                    onValueChange={(value) => {
                        setSearchParams(value ? { status: value } : {})
                        setPage(1)
                    }}
                >
                    <SelectTrigger className="w-45">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {loading ? (
                <Spinner className="mx-auto mt-20 size-8" />
            ) : bids.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">No Bids found.</p>
            ) : (
                <ComponentScroller orientation="vertical">
                    <div className="space-y-2">
                        {bids.map((b) => (
                            <BidBar key={b.id} bid={b} />
                        ))}
                    </div>
                </ComponentScroller>
            )}

            {pages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => goTo(e, page - 1)}
                                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <span className="px-3 text-sm text-muted-foreground">
                                Page {page} of {pages}
                            </span>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => goTo(e, page + 1)}
                                className={page >= pages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            )}

        </main>
    )
}