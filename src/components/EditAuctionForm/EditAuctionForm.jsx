import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toInput } from "@/lib/helpers/dateHelper"
import { getApiError } from "@/lib/helpers/getApiError"
import { toast } from "react-toastify"

export function EditAuctionForm({ open, onOpenChange, auction, onSubmit }) {
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const data = new FormData(evt.currentTarget)

        const end = data.get("end_date")
        if (end) data.set("end_date", new Date(end).toISOString())
        else data.delete("end_date")

        if (!data.get("buy_now_price")) data.delete("buy_now_price")
        if (data.get("image")?.size === 0) data.delete("image")

        try {
            await onSubmit(data)
            onOpenChange(false)
        } catch (error) {
            toast.error(getApiError(error))
        }
    }




    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Edit Auction</DialogTitle>
                        <DialogDescription>Leave a field as is to keep it unchanged.</DialogDescription>
                    </DialogHeader>

                    <Field>
                        <Label htmlFor="product_name">Name</Label>
                        <Input id="product_name" name="product_name" defaultValue={auction.product_name} required />
                    </Field>

                    <Field>
                        <Label htmlFor="product_description">Description</Label>
                        <Input id="product_description" name="product_description" defaultValue={auction.product_description} required />
                    </Field>

                    <Field>
                        <Label htmlFor="buy_now_price">Buy now (optional)</Label>
                        <Input id="buy_now_price" name="buy_now_price" type="number" step="0.01" min="0.01"
                            defaultValue={auction.buy_now_price ?? ""} />
                    </Field>

                    <Field>
                        <Label htmlFor="end_date">New end date (optional)</Label>
                        <Input id="end_date" name="end_date" type="datetime-local"
                            defaultValue={toInput(auction.end_date)} required />
                    </Field>

                    <Field>
                        <Label htmlFor="image">Replace image (optional)</Label>
                        <Input id="image" name="image" type="file" accept="image/*" />
                    </Field>

                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}