import * as React from "react"

// import { Bar, BarChart, ResponsiveContainer } from "recharts"

// import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import CustomSearch from "./Form/Search/CustomSearch"




export default function SearchDrawerComponent() {


    return (

        <Drawer className="focus:outline-none">
            <DrawerTrigger asChild>
                {/* <Button variant="outline" className="border-none" > */}

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline-block">
                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                </svg>

                {/* </Button> */}
            </DrawerTrigger>

            <DrawerContent>
                <div className="mx-auto w-full max-w-sm focus:outline-none">

                    <DrawerHeader>
                        <div className="flex flex-col items-end ">
                            <DrawerClose asChild>
                                <div className=" rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </div>

                            </DrawerClose>


                        </div>
                        <DrawerTitle className="mb-4">Search</DrawerTitle>

                        <CustomSearch />
                    </DrawerHeader >
                    <DrawerFooter>


                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>


    )
}
