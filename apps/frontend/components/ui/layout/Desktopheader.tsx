"use client"
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";
interface navbarProps {}

const navbar = (props: PropsWithChildren) => {
    const [scrollPosition,setScrollPosition] = useState(0);

    const handleScroll = () => {
        setScrollPosition(window.scrollY)
    }

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        return ()=> {
            window.removeEventListener("scroll",handleScroll)
        }
    })

    const isScrollDown = scrollPosition > 10 ;

  return (
    <nav className={cn(
        " hidden md:block w-full h-16 fixed top-0 left-0 z-50 transition-all duration-300",
        isScrollDown ? "bg-white/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center"> {props.children} </div>
    </nav>
    
  );
};
export default navbar;
