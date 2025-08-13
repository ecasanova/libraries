import { dragAndDrop } from "@formkit/drag-and-drop";
import { useEffect, useRef } from "react";

export default function Lista() {
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      dragAndDrop(ref.current);
    }
  }, []);

  return (
    <ul ref={ref}>
      <li>Elemento 1</li>
      <li>Elemento 2</li>
    </ul>
  );
}
