import { useEffect, useState } from "react";

type VirtualItem = { index: number; start: number };

type useVirtualizerProps = {
  count: number;
  itemSize: number;
  overscan: number;
  getScrollElement: () => HTMLDivElement | null;
};

export function useVirtualizer({
  count,
  itemSize,
  overscan,
  getScrollElement,
}: useVirtualizerProps) {
  const [windowHeight, setWindowHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemSize) - overscan);

  const endIndex = Math.min(
    count - 1,
    Math.floor((scrollTop + windowHeight) / itemSize) + overscan
  );

  const handleScroll = (e: Event) => {
    const target = e.currentTarget as HTMLDivElement;
    setScrollTop(target.scrollTop);
  };

  function getWindowHeight(element: HTMLDivElement | null) {
    const bcr = element?.getBoundingClientRect();
    return bcr?.height || 0;
  }

  useEffect(() => {
    const scrollElement: HTMLDivElement | null = getScrollElement();

    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      const windowHeight = getWindowHeight(scrollElement);
      setWindowHeight(windowHeight);
    }

    return () => {
      scrollElement?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    getVirtualItems: () => {
      const items: VirtualItem[] = [];

      for (let i = startIndex; i <= endIndex; i++) {
        items.push({ index: i, start: i * itemSize });
      }

      return items;
    },
    getTotalSize: () => {
      return count * itemSize;
    },
  };
}
