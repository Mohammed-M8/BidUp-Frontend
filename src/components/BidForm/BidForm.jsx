import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "react-toastify"

export function BidForm({ open, onOpenChange, onSubmit, minPrice }) {

    const [price, setPrice] = useState()

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await onSubmit(Number(price))
            setPrice("")
            onOpenChange(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Place Bid</DialogTitle>
                        <DialogDescription>
                            Input a price to place a bid on the auction (more than {minPrice})
                        </DialogDescription>
                    </DialogHeader>
                    <Field>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            min={minPrice}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Field>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit" >Place Bid</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
