import { useEffect, useRef, useState } from "react";
import ELK, { type ELK as ELKInstance } from "elkjs/lib/elk.bundled.js";

export default function useELK() {
  // const elkRef = useRef<ELKInstance | null>(null);

  // useEffect(() => {
  //   if (!elkRef.current) {
  //     elkRef.current = new ELK();
  //   }
  // }, []);

  // return elkRef.current;

  const [elk, setElk] = useState<ELKInstance | null>(null);

  useEffect(() => {
    if (!elk) {
      setElk(new ELK());
    }
  }, []);

  return elk;
}
