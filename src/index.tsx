import { render } from 'preact';

import './style.css';
import { Term } from './components/Term';
import { Header } from './components/Header';
import { useState } from 'preact/hooks';
import { Things } from './components/Things';

interface R {
  s: number
}

const routables: Object = {
  1: (<div class={"flex p-[1px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 w-full rounded"}>
    <Term />
  </div>),
  2: (<div class={"flex p-[1px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 w-full rounded"}>
    <Things />
  </div>)
}

const contains = (needle: any, haystack: Object): boolean => (Object.keys(haystack).indexOf(String(needle)) !== -1);

// crack router, may be improved in future
function Router({ s }: R) {
  return routables[s];
}


export function App() {
  const [content, setContent] = useState<number>(1);

  return (
    <div>

      <Header content={{v: content, s: setContent}} />
      <div class={"w-screen h-screen bg-zinc-900 p-[calc(0.5rem-1px)] pt-8 flex"}>
        <Router s={content} />
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app'));
