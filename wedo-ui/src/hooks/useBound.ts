import { Rect } from "@wedo/utils";
import { useEffect, useRef, RefObject, useState } from "react";

const useBound = (callback?: (rect: Rect) => void): [Rect, RefObject<HTMLDivElement>] => {
  const [rect, setRect] = useState<Rect>(Rect.ZERO);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      const _rect = new Rect(Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height))
      callback && callback(_rect)
      setRect(_rect)
    }
  }, [callback])

  return [rect, ref]
}

export default useBound