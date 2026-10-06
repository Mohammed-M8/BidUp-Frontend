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
import { Field } from "../ui/field"
import { Input } from "../ui/input"
import { useState } from "react"
import { Label } from "../ui/label"

export function CancelForm({ open, onOpenChange, onConfirm }) {

    const [reason, setReason] = useState("")
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onConfirm(reason)
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Cancel Auction</DialogTitle>
                        <DialogDescription>
                            Cancel this auction? This ends the auction immediately
                            and can't be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <Field>
                        <Label htmlFor="reason">Cancel Reason</Label>
                        <Input
                            id="reason"
                            name="reason"
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </Field>

                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}