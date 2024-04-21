import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ICategorySelectCompProps {
    handleCategoryChange: (value: string) => void
}
export function CategorySelectComp({ handleCategoryChange }: ICategorySelectCompProps) {
    return (
        <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="t-shirt">t-shirt</SelectItem>
                    <SelectItem value="jumper">jumper</SelectItem>
                    <SelectItem value="jeans">jeans</SelectItem>
                    <SelectItem value="jackets">jacket</SelectItem>
                    <SelectItem value="hat">hat</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
