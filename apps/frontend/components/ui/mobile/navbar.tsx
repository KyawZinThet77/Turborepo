"use client"
import { cn } from "@/lib/utils";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { PropsWithChildren, useEffect, useState } from "react";
import SideBar from "../layout/sidebar";


const navbar = (props: PropsWithChildren) => {
 

  return (
<div className="md:hidden">

  <SideBar triggerIcon={<Bars3Icon />}  triggerClassName="absolute top-2 left-2">
    {props.children}
  </SideBar>
</div>
    
  );
};
export default navbar;