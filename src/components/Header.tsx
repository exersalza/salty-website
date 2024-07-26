import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks"
import { workspaceSwitcher } from "..";

interface Props {
  content: { v: number, s: Dispatch<StateUpdater<number>> }
}

interface WsProps {
  current: number,
  switcher: Function
}


function Workspaces({ current, switcher }: WsProps) {
  const [workspace, _setWorkspace] = useState<Array<number>>([1, 2]);
  const [c, setC] = useState<number>(1); // c -> counter

  function handleClick(e: any) {
    const id = Number( e.target.dataset.id );
    workspaceSwitcher.value = id;
    switcher(id);
  }

  useEffect(() => { setC(current) }, [current])

  return (
    <div class={"h-full pl-2 flex gap-1"}>
      {workspace.map((i) => {
        return <p class={`${c == i ? "border-b" : ""} cursor-pointer border-purple-500 w-4 flex place-content-center select-none`}
          data-id={i}
          onClick={handleClick}>{i}</p>
      })}
    </div>
  )
}

function ClockAndDate() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const f = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(f);
  }, []);

  return (
    <div class={"h-full select-none"}>
      {/*                      no spaceship :( */}
      <p>{time.toLocaleTimeString()} {time.toLocaleDateString()}</p>
    </div>
  )
}

function Stats() {
  return (
    <div class={"h-full"}>

    </div>
  )
}

export function Header({ content }: Props) {
  return (
    <div class={"absolute w-screen h-6 bg-zinc-800 flex"}>
      <div class={"w-1/3"}> {/* workspaces */}
        <Workspaces current={content.v} switcher={content.s} />
      </div>
      <div class={"w-1/3 flex place-content-center"}> {/* clock */}
        <ClockAndDate />
      </div>
      <div class={"w-1/3 flex place-content-end"}> {/* user */}
        <Stats />
      </div>
    </div>
  )
}
