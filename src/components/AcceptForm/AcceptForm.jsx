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

export function AcceptForm({ open, onOpenChange, bid, onConfirm }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Accept Bid</DialogTitle>
                    <DialogDescription>
                        Accept {bid?.bidder?.username}'s bid of BD {bid?.price}? This ends the
                        auction immediately and can't be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
                    <Button onClick={onConfirm}>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}