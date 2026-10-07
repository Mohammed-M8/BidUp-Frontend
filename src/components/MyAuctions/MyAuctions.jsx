import { UserContext } from "@/contexts/UserContext"
import { getApiError } from "@/lib/helpers/getApiError"
import { createAuction, getUserAuctions } from "@/services/auctionService"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { toast } from "react-toastify"
import { Spinner } from "../ui/spinner"
import ComponentScroller from "../ComponentScroller/ComponentScroller"
import AuctionBar from "../AuctionBar/AuctionBar"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { AuctionForm } from "../AuctionForm/AuctionForm"
import Breadcrumbs from "../BreadCrumb/BreadCrumb"

export default function MyAuctions() {
    const { user } = useContext(UserContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.get("status")
    const [auctions, setAuctions] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [createOpen, setCreateOpen] = useState(false)
    const [refresh, setRefresh] = useState(0)

    const items = [
        { label: 'All', value: '' },
        { label: "Active", value: 'active' },
        { label: "Sold", value: 'sold' },
        { label: "Unsold", value: 'ended' },
        { label: "Cancelled", value: 'cancelled' },
    ]
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const data = await getUserAuctions(user.sub, page, 12, status)
                setAuctions(data.items)
                setPages(data.pages)
            } catch (error) {
                toast.error(getApiError(error))
            } finally {
                setLoading(false)
            }
        }

        getData()

    }, [page, status, user, refresh])

    const handleCreate = async (formData) => {
        await createAuction(formData)
        toast.success("Auction created")
        setRefresh((r) => r + 1)
    }

    const goTo = (evt, target) => {
        evt.preventDefault()
        if (target >= 1 && target <= pages) setPage(target)
    }

    return (
        <main className="space-y-4 px-4 py-4">
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "My Auctions", href: "/my/auctions" },
                ]}
            />
            <div className="flex flex-row items-center gap-4">
                <h1 className="text-3xl">Your Auctions</h1>

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
                <Button className="ml-auto" onClick={() => setCreateOpen(true)}>
                    Create auction
                </Button>
            </div>
            {loading ? (
                <Spinner className="mx-auto mt-20 size-8" />
            ) : auctions.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">No auctions found.</p>
            ) : (
                <ComponentScroller orientation="vertical">
                    {auctions.map((a) => <AuctionBar key={a.id} auction={a} />)}
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
            <AuctionForm open={createOpen} onOpenChange={setCreateOpen} onSubmit={handleCreate} />

        </main>

    )
}