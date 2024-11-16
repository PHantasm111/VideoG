import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const SelectDuration = ({ onUserSelect }) => {
    return (
        <div className="mt-10">
            <h2 className='text-xl font-bold text-primary'>Duration</h2>
            <p className='text-gray-600'>Select the duration of your video</p>

            <Select
                onValueChange={(value) => {
                    onUserSelect('duration', value)
                }}
            >
                <SelectTrigger className="w-full text-lg mt-2 p-6">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='15 seconds'>15 seconds</SelectItem>
                    <SelectItem value='30 seconds'>30 seconds</SelectItem>
                    <SelectItem value='60 seconds'>60 seconds</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectDuration