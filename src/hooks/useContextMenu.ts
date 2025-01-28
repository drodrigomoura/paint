import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

type useContextMenuProps = {
  setIsContextMenuVisible: Dispatch<SetStateAction<boolean>>;
};

export const useContextMenu = ({
  setIsContextMenuVisible,
}: useContextMenuProps) => {
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setIsContextMenuVisible(true);

      const newX =
        e.clientX + (contextMenuRef.current?.offsetWidth || 0) >
        window.innerWidth
          ? e.clientX - (contextMenuRef.current?.offsetWidth || 0)
          : e.clientX;

      const newY =
        e.clientY + (contextMenuRef.current?.offsetHeight || 0) >
        window.innerHeight
          ? e.clientY - (contextMenuRef.current?.offsetHeight || 0)
          : e.clientY;

      setContextMenuPosition({
        x: newX,
        y: newY,
      });
    },
    [setIsContextMenuVisible]
  );

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleContextMenu]);

  return { contextMenuPosition, contextMenuRef };
};
