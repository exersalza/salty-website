import { createContext, render } from 'preact';

import './style.css';
import { Term } from './components/Term';
import { Header } from './components/Header';
import { useContext, useState } from 'preact/hooks';
import { Things } from './components/Things';
import { Signal, signal } from '@preact/signals';

const workspaceSwitcher = signal<number>();
const AppState = createContext<Signal<number>>(workspaceSwitcher);

interface R {
  s: number
}

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



const contains = (needle: any, haystack: Object): boolean => (Object.keys(haystack).indexOf(String(needle)) !== -1);

export function App() {
  const [content, setContent] = useState<number>(1);

  return (
    <div>
      <AppState.Provider value={workspaceSwitcher}>

        <Header content={{ v: content, s: setContent }} />
        <div class={"w-screen h-screen bg-zinc-900 p-[calc(0.5rem-1px)] pt-8 flex"}>
          <Window className={""}><Term /></Window>,
          <Window className={""}><Things /></Window>
        </div>
      </AppState.Provider>
    </div>
  );
}

render(<App />, document.getElementById('app'));
