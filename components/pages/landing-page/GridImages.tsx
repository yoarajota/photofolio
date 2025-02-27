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

const Item = ({ src, index, width }) => {
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
      className={`relative overflow-hidden ${width}`}
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

  const positionItems = () => {
    const grid = gridRef.current;
    if (!grid) return;

    const gridWidth = grid.offsetWidth;
    const gap = 16;

    // Lista fixa de larguras, ajustada para garantir um encaixe correto
    let columnWidths;
    if (gridWidth > 1200) {
      columnWidths = [300, 450, 600]; // Desktop (exemplo: múltiplos de 150)
    } else if (gridWidth > 768) {
      columnWidths = [250, 375, 500]; // Tablet (múltiplos de 125)
    } else {
      columnWidths = [200]; // Mobile (uma única coluna)
    }

    const columns = Math.floor(gridWidth / (columnWidths[0] + gap));
    const columnHeights = Array(columns).fill(0);

    Array.from(grid.children).forEach((item, index) => {
      const width = columnWidths[index % columnWidths.length]; // Alterna entre larguras fixas
      item.style.width = `${width}px`;

      // Ajustar a altura conforme a proporção da imagem
      const aspectRatio =
        item.querySelector("img").naturalHeight /
        item.querySelector("img").naturalWidth;
      const height = width * aspectRatio;

      const minHeight = Math.min(...columnHeights);
      const columnIndex = columnHeights.indexOf(minHeight);

      const left = columnIndex * (columnWidths[0] + gap);
      const top = minHeight;

      item.style.position = "absolute";
      item.style.left = `${left}px`;
      item.style.top = `${top}px`;
      item.style.height = `${height}px`;

      columnHeights[columnIndex] = minHeight + height + gap;
    });

    grid.style.height = `${Math.max(...columnHeights)}px`;
  };

  // Chamar positionItems() em resize para recalcular corretamente
  useEffect(() => {
    const loadImagesAndPosition = () => {
      const images = gridRef.current?.querySelectorAll("img") || [];
      const promises = Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve();
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
      className="grid grid-cols-3 auto-rows-[10px] gap-4 mx-auto max-w-7xl"
    >
      {items.map(({ src, width, id }, index) => (
        <Item key={id} src={src} index={index} width={width} />
      ))}
    </motion.section>
  );
}
