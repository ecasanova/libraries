import { useDragAndDrop } from "@formkit/drag-and-drop/react";

export default function Lista() {
  const [ref, items] = useDragAndDrop<HTMLUListElement, string>([
    "Elemento 1",
    "Elemento 2",
  ]);

  return (
    <ul ref={ref}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
