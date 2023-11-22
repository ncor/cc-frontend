import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/client/utils";


export type LoadingSpinnerProps = {
    isLoading: boolean
};

export default function LoadingSpinner({
    isLoading
}: LoadingSpinnerProps) {
    return <Icons.spinner className={cn(
        "hidden mr-2 h-4 w-4",
        isLoading ? "block animate-spin" : ""
    )}/>;
}
