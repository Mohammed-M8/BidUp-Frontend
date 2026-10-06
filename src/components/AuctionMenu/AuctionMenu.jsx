import { Link } from "react-router"
import { buttonVariants } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function AuctionMenu({ categories }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={buttonVariants({ variant: "ghost", className: "cursor-pointer" })}>
                Auctions
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/auctions">
                        All Auctions
                    </Link>
                </DropdownMenuItem>

                {categories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild className="cursor-pointer">
                        <Link to={`/auctions?category_id=${category.id}`}>
                            {category.name}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}