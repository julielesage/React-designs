import { useEffect, useRef, useState, MutableRefObject } from "react";

export function useHover<T extends HTMLElement = HTMLElement>(): [
  MutableRefObject<T>?,
  boolean?,
] {
  const [value, setValue] = useState<boolean>(false)
  const ref = useRef<T>(null)
  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)
  useEffect(
    // eslint-disable-next-line consistent-return
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)
        //then remove listener while mouse is still on moving to avoid multi renders
        return () => {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current],
  );
  return [ref as MutableRefObject<T>, !!value]
}

export function useFocus(ref: any, mounted: boolean): boolean {

  const [state, setState] = useState(false);

  useEffect(() => {
    const onFocus = () => setState(true);
    const onBlur = () => setState(false);
    if (mounted) {
      ref.current.addEventListener('focus', onFocus);
      ref.current.addEventListener('blur', onBlur);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', onFocus);
        ref.current.removeEventListener('blur', onBlur);
      }
    };

  }, []);

  return state;
}
