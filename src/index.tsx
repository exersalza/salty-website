import { createContext, createRef, Ref, RefObject, render } from 'preact';

import './style.css';
import { Term } from './components/Term';
import { Header } from './components/Header';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Things } from './components/Things';
import { Signal, signal } from '@preact/signals';

export const workspaceSwitcher = signal<number>();
const contains = (needle: any, haystack: object): boolean => (Object.keys(haystack).indexOf(String(needle)) !== -1);
const MAX_WS = 2;

interface Props {
  children: preact.JSX.Element,
  className?: string | undefined | null
  style?: preact.JSX.CSSProperties,
  ref?: Ref<HTMLDivElement>
}

function Window({ children, className, style, ref }: Props) {
  return (
    <div className={className} style={style} ref={ref}>
      <div class={`flex p-[1px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 w-full h-full rounded`}>
        {children}
      </div>
    </div>
  )
}


export function App() {
  const [content, setContent] = useState<number>(1);

  const ws1_ref = createRef<any>();
  const ws2_ref = createRef<any>();

  function keydownHandler(e: KeyboardEvent) {
    if (/[0-9]/.test(e.key) && e.altKey) {
      if (Number(e.key) <= MAX_WS && Number(e.key) >= 1) {
        e.preventDefault();
        setContent(Number(e.key));
        workspaceSwitcher.value = Number(e.key);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    }

  }, []);

  useEffect(() => {
    switch (content) {
      case 1:
        ws1_ref.current.base.style.removeProperty("transform");
        ws2_ref.current.base.style.setProperty("transform", "translateX(100vw)");
        break;

      case 2:
        ws2_ref.current.base.style.removeProperty("transform");
        ws1_ref.current.base.style.setProperty("transform", "translateX(-100vw)");
        break;

      default:
        break;
    }
  }, [content]);


  return (
    <div class={"overflow-hidden"}>

      <Header content={{ v: content, s: setContent }} />
      <div class={"w-full h-screen bg-zinc-900 p-[calc(0.5rem-1px)] pt-8 flex overflow-hidden transition-all "} style={{}}>
        <Window className={`absolute transition-all w-[calc(100vw-0.9rem)] h-[calc(100vh-2.5rem)] duration-200`}
          style={{ transform: "" }}
          ref={ws1_ref}>
          <Term />
        </Window>
        <Window className={`absolute transition-all w-[calc(100vw-0.9rem)] h-[calc(100vh-2.5rem)] duration-200`}
          style={{ transform: "translateX(100vw)" }}
          ref={ws2_ref}>
          <Things />
        </Window>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app'));
