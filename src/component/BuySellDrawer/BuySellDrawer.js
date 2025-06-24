import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import BuySellNow from "@/component/buySellNow/BuySellNow";

function BuySellDrawer() {
  return (
    <Drawer className="md:w-96">
      <DrawerTrigger asChild>
        <Button
          size="sm"
          className="text-sm bg-headupb2b border border-white relative group transition-all duration-300 hover:shadow-lg"
        >
          <span className="group-hover:scale-110 transition-transform duration-300 inline-block">
            Tell Us Your Requirements ↑
          </span>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Tell Us Your Requirements
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="fixed top-0 h-full lg:w-[30%] w-[46vh] bg-transparent float-left lg:ml-[1010px]">
        <div className="max-h-[500vh] flex justify-center align-middle">
          <DrawerHeader className="text-left">
            <BuySellNow />
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default BuySellDrawer;
