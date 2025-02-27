import {
    motion,
    useScroll,
    useInView,
    useMotionValueEvent,
    useSpring,
  } from "motion/react";
  import { useEffect, useRef, useState } from "react";
  
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300",
    },
  ];
  
  const Item = ({ src, index }) => {
    const ref = useRef(null);
  
    const inView = useInView(ref, {
      once: true,
      amount: 0.2,
    });
  
    return (
      <motion.div
        key={index}
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
        }}
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={src}
          alt={`image-${index}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>
    );
  };
  
  export default function GridImages({ sectionRef }) {
    const { scrollY } = useScroll();
    const y = useSpring(50);
    const gridRef = useRef(null);
    const [items, setItems] = useState(images);
  
    useMotionValueEvent(scrollY, "change", (latest) => {
      const startSpaceToScroll = sectionRef.current?.clientHeight * 0.2;
      const endSpaceToScroll = sectionRef.current?.clientHeight * 0.4;
  
      if (latest > startSpaceToScroll && latest < endSpaceToScroll) {
        const scrollRatio =
          (latest - startSpaceToScroll) / (endSpaceToScroll - startSpaceToScroll);
        y.set(50 - scrollRatio * 200);
      }
    });
  
    useEffect(() => {
      const positionItems = () => {
        const grid = gridRef.current;
        if (!grid) return;
  
        const columnWidth = 300;
        const gap = 16;
        const columns = Math.floor(grid.offsetWidth / (columnWidth + gap));
        const columnHeights = Array(columns).fill(0);
  
        Array.from(grid.children).forEach((item) => {
          const minHeight = Math.min(...columnHeights);
          const columnIndex = columnHeights.indexOf(minHeight);
  
          const left = columnIndex * (columnWidth + gap);
          const top = minHeight;
  
          item.style.position = "absolute";
          item.style.left = `${left}px`;
          item.style.top = `${top}px`;
          item.style.width = `${columnWidth}px`;
  
          columnHeights[columnIndex] = minHeight + item.offsetHeight + gap;
        });
  
        grid.style.height = `${Math.max(...columnHeights)}px`;
      };
  
      const loadImagesAndPosition = () => {
        const images = gridRef.current?.querySelectorAll("img") || [];
        const promises = Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                return resolve();
              }
  
              img.onload = resolve;
            })
        );
  
        Promise.all(promises).then(positionItems);
      };
  
      loadImagesAndPosition();
      window.addEventListener("resize", loadImagesAndPosition);
  
      return () => window.removeEventListener("resize", loadImagesAndPosition);
    }, [items]);
  
    return (
      <motion.section
        ref={gridRef}
        style={{ y }}
        className="w-full max-w-xl sm:max-w-3xl xl:max-w-7xl mx-auto relative"
      >
        {items.map(({ src, id }, index) => (
          <Item key={id} src={src} index={index} />
        ))}
      </motion.section>
    );
  }
  