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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getApiError } from "@/lib/helpers/getApiError"
import { getCategories } from "@/services/categoryService"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export function AuctionForm({ open, onOpenChange, onSubmit }) {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")

    useEffect(() => {
        const getData = async () => {
            const data = await getCategories()
            setCategories(data)
        }
        getData()
    }, [])

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const formEl = evt.currentTarget
        const data = new FormData(formEl)

        data.set("end_date", new Date(data.get("end_date")).toISOString())

        if (!data.get("buy_now_price")) data.delete("buy_now_price")
        if (category) data.set("category_id", category)

        try {
            await onSubmit(data)
            formEl.reset()
            setCategory("")
            onOpenChange(false)
        } catch (error) {
            console.log(error.response?.data)
            toast.error(getApiError(error))
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Create Auction</DialogTitle>
                        <DialogDescription>
                            Fill in the details of the item you want to sell.
                        </DialogDescription>
                    </DialogHeader>

                    <Field>
                        <Label htmlFor="product_name">Name</Label>
                        <Input id="product_name" name="product_name" required />
                    </Field>

                    <Field>
                        <Label htmlFor="product_description">Description</Label>
                        <Input id="product_description" name="product_description" required />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <Label htmlFor="starting_price">Starting price</Label>
                            <Input id="starting_price" name="starting_price" type="number" step="0.01" min="0.01" required />
                        </Field>
                        <Field>
                            <Label htmlFor="buy_now_price">Buy now (optional)</Label>
                            <Input id="buy_now_price" name="buy_now_price" type="number" step="0.01" min="0.01" />
                        </Field>
                    </div>

                    <Field>
                        <Label htmlFor="end_date">Ends</Label>
                        <Input id="end_date" name="end_date" type="datetime-local" required />
                    </Field>

                    <Field>
                        <Label>Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categories.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <Label htmlFor="image">Image</Label>
                        <Input id="image" name="image" type="file" accept="image/*" required />
                    </Field>

                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}