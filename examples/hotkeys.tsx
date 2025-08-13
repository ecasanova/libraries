import { useEffect } from "react";
import hotkeys from "hotkeys-js";

export default function Hotkeys() {
  useEffect(() => {
    hotkeys("ctrl+k", (event) => {
      event.preventDefault();
      console.log("Abrir buscador");
    });

    return () => {
      hotkeys.unbind("ctrl+k");
    };
  }, []);

  return null;
}
