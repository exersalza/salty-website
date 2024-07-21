import { createContext, render } from 'preact';

import './style.css';
import { Term } from './components/Term';
import { Header } from './components/Header';
import { useEffect, useState } from 'preact/hooks';
import { Things } from './components/Things';
import { Signal, signal } from '@preact/signals';

const workspaceSwitcher = signal<number>();
const AppState = createContext<Signal<number>>(workspaceSwitcher);
const contains = (needle: any, haystack: Object): boolean => (Object.keys(haystack).indexOf(String(needle)) !== -1);

interface Props {
  children: preact.JSX.Element,
  className: string | undefined | null
}

function Window({ children, className }: Props) {
  return (
    <div class={`flex p-[1px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 w-full rounded ${className}`}>
      {children}
    </div>
  )
}


export function App() {
  const [content, setContent] = useState<number>(1);

  function keydownHandler(e: KeyboardEvent) {
    if (/[0-9]/.test(e.key) && e.altKey) {
      if (Number(e.key) <= 2 && Number(e.key) >= 1) {
        e.preventDefault();
        setContent(Number(e.key));
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    }

  }, []);

  return (
    <div class={"overflow-hidden"}>
      <AppState.Provider value={workspaceSwitcher}>

        <Header content={{ v: content, s: setContent }} />
        <div class={"w-full h-screen bg-zinc-900 p-[calc(0.5rem-1px)] pt-8 flex overflow-hidden"}>
          <Window className={`absolute transition-all -translate-x-[calc(${content !== 1 ? "100vw+10px" : ""})] max-w-[calc(100vw-0.9rem)] h-[calc(100vh-2.5rem)]`}><Term /></Window>
          <Window className={`absolute transition-all translate-x-[calc(${content !== 2 ? "100vw+10px" : ""})] max-w-[calc(100vw-0.8rem-1px)] h-[calc(100vh-2.5rem)]`}><Things /></Window>
        </div>
      </AppState.Provider>
    </div>
  );
}

render(<App />, document.getElementById('app'));
