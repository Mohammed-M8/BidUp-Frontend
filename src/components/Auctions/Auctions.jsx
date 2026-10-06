import { getAuctions } from "@/services/auctionService"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { toast } from "react-toastify"
import { Field } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import ComponentScroller from "../ComponentScroller/ComponentScroller"
import { Spinner } from "../ui/spinner"
import AuctionBar from "../AuctionBar/AuctionBar"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"
import { getApiError } from "@/lib/helpers/getApiError"
import Breadcrumbs from "../BreadCrumb/BreadCrumb"

export default function Auctions() {
    const [searchParams] = useSearchParams()
    const categoryId = searchParams.get("category_id")

    const [auctions, setAuctions] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const data = await getAuctions(categoryId, page, 12, search)
                setAuctions(data.items)
                setPages(data.pages)
            } catch (error) {
                toast.error(getApiError(error))
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [categoryId, page, search])

    const handleSearch = (evt) => {
        evt.preventDefault()
        setSearch(searchInput.trim())
        setPage(1)
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
                    { label: "Auctions", href: "/auctions" },
                ]}
            />
            <h1 className="text-3xl">Search Auctions</h1>

            <form onSubmit={handleSearch}>
                <Field className="my-2" orientation="horizontal">
                    <Input
                        type="search"
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => {
                            const value = e.target.value
                            setSearchInput(value)

                            if (value === "") {
                                setSearch("")
                                setPage(1)
                            }
                        }}
                    />
                    <Button type="submit">Search</Button>
                </Field>
            </form>

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
        </main>
    )
}