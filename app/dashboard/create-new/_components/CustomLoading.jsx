import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"


const CustomLoading = ({ loading }) => {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                <AlertDialogTitle className="sr-only">Generating video...</AlertDialogTitle>
                <div className="flex flex-col items-center justify-center my-10">
                    <Image
                        src="/loading.gif"
                        alt="loading"
                        width={150}
                        height={150}
                    />

                    <h2 className="text-xl mt-3">Generate your video...</h2>
                    <p className="text-red-400/90 text-sm">Do not refresh the page</p>
                </div>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default CustomLoading