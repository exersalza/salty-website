import { Dispatch, useEffect, useRef, useState } from "preact/hooks";
import { contains } from "../utils";
import { COMMANDS } from "../commands";

export let PWD = "~";
export const CMD_LENGTH = 64;

interface FCmdProps {
  cmd: string
  pwd?: string
}

interface CMDProps {
  setPastCommands?: Dispatch<PastCommand[]>,
  pastCommands?: PastCommand[]
}

interface PrefixProps {
  pwd: string
}

type PastCommand = {
  cmd: string,
  pwd: string
}

function getCmd(cmd: string): any { if (cmd.length === 0) {
    return () => { }
  }

  let c = COMMANDS[cmd];

  if (!c) {
    return () => `salt: command not found: ${cmd}`;
  }

  return c;
}

function Prefix(props: PrefixProps) {
  return (
    <span class="">
      <span className={"text-green-500"}>➜ </span> <span className="text-cyan-400">{props.pwd}</span>
    </span>
  )
}

function FinishedCommandElement(props: FCmdProps) {
  let ToRender = getCmd(props.cmd)();
  if (!ToRender) {
    ToRender = () => { // create default
      return <p></p>
    }
  }
  return (
    <div>
      <div className={"flex gap-2"}>
        <Prefix pwd={props.pwd} /><span className={`${contains(props.cmd, COMMANDS) ? "text-green-500" : "text-red-500"}`}>{props.cmd}</span>
      </div>
      <ToRender />
    </div>
  )
}

function CommandElement({ setPastCommands }: CMDProps) {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>();

  function handleOnEnter(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let v = inputRef.current.value;
      setPastCommands((prev: string[]) => prev.concat({cmd: v, pwd: pwd}));

      if (v === "clear" || v === "cls") { // special commands
        setPastCommands([]);
      }

      inputRef.current.value = "";
    }
  }


  useEffect(() => {
    window.addEventListener("keydown", handleOnEnter);

    return () => {
      window.removeEventListener("keydown", handleOnEnter);
    }
  }, []);

  const PWD = Math.random()

  return (
    <div className={"flex gap-2"}>
      <Prefix pwd={String(PWD)} />
      <input className={`bg-transparent min-w-max outline-0 no-underline caret-white ${contains(value, COMMANDS) ? "text-green-500" : "text-red-500"}`}
        size={CMD_LENGTH}
        type="text"
        ref={inputRef}
        onInput={(e) => (setValue((e.target as HTMLInputElement).value))}
        maxLength={CMD_LENGTH}
        spellcheck={false}
        autoFocus={true}
        onBlur={(e) => { (e.target as HTMLInputElement).focus() }}
      />
    </div>
  )
}

export function Term() {
  const [pastCommands, setPastCommands] = useState<PastCommand[]>([]);

  return (
    <div class={"w-full rounded bg-zinc-800 p-1 pt-0 font-mono"}>
      {pastCommands.map((ele) => {
        return (
          <FinishedCommandElement pwd={ele.pwd} cmd={ele.cmd} />
        )
      })}
      <CommandElement setPastCommands={setPastCommands} />
    </div>
  )
}
