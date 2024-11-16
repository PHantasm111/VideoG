"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";


const SelectTopic = ({ onUserSelect }) => {

    const options = ['Custom Prompt', 'Random AI story', 'Scary story', 'Historical Facts', 'Bed Time story', 'Motivational'];

    const [setselectedOption, setSetselectedOption] = useState();

    return (
        <div>
            <h2 className='text-xl font-bold text-primary'>Content</h2>
            <p className='text-gray-600'>What is the topic of your video?</p>
            <Select
                onValueChange={(value) => {
                    setSetselectedOption(value)
                    value != "Custom Prompt" && onUserSelect('topic', value)
                }}
            >
                <SelectTrigger className="w-full text-lg mt-2 p-6">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem value={option} key={index}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {setselectedOption === 'Custom Prompt' &&
                <Textarea
                    onChange={(e) => onUserSelect('topic', e.target.value)}
                    className="mt-3"
                    placeholder="Write prompt on which you want to generate videon..."
                />

            }

        </div>
    )
}

export default SelectTopic