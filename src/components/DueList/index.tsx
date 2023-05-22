"use client"
import { animate, motion, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import DueRow from "../DueRow";
type DueList = {
    data: { [x: string]: any; }[]
}
export default function DueList({data}:DueList) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [trackMouse, setTrackMouse] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);


  const x = useMotionValue(0);

  const handleMouseMove = (e: any) => {
    if (!carouselRef.current) return;
    if (!trackMouse) return;

    setAnimationComplete(false);

    const xVal = e.pageX - carouselRef.current.offsetLeft;
    const walk = (xVal - startX) * 2; //scroll-fast

    const controls = animate(x, scrollLeft - walk, {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
      onUpdate: (val) => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollLeft = val;
      },
      onComplete: () => {
        setAnimationComplete(true);
      },
      onStop: () => {
        setAnimationComplete(true);
      }
    });
    return controls.stop;
  };

  const handleMouseDown = (e:any) => {
    if (!carouselRef.current) return;

    setTrackMouse(true);
    
    const startX = e.pageX - carouselRef.current.offsetLeft;
    setStartX(startX);

    const scrollLeft = carouselRef.current.scrollLeft;
    setScrollLeft(scrollLeft);
  };

  const handleMouseLeave = () => {
    setTrackMouse(false);
  };

  const handleMouseUp = () => {
    setTrackMouse(false);
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;

    if (animationComplete) {
      x.set(carouselRef.current.scrollLeft);
    }
  };
  return (
    <>
    <motion.ul className="flex items-center list-none h-auto overflow-x-scroll  mt-4 mb-0 mx-auto py-0 cursor-grabbing" ref={carouselRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onScroll={handleScroll}>
        {data.map((item:any) => {
            return(<motion.li className="flex-[0_0_50%] md:flex-[0_0_40%]  mr-2 select-none" key={item.id}><DueRow id={item.id}  title={item.name}  price={item.price} date={item.nextdue} category={item.category} paid={item.paid}/></motion.li>) 
        } )}
    </motion.ul>
    </>
  )
}
