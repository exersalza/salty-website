import { Dispatch, useEffect, useRef, useState } from "preact/hooks";
import { contains } from "../utils";
import { COMMANDS } from "../commands";


interface FCmdProps {
  cmd?: string
}

interface CMDProps {
  setPastCommands?: Dispatch<string[]>,
  pastCommands?: string[]
}

interface PrefixProps {
  pwd: string
}

function getCmd(cmd: string): any {
  if (cmd.length === 0) {
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

function FinishedCommandElement({ cmd }: FCmdProps) {
  console.log(getCmd(cmd))
  return (
    <div>
      <div className={"flex gap-2"}>
        <Prefix pwd={"~"} /><span className={`${contains(cmd, COMMANDS) ? "text-green-500" : "text-red-500"}`}>{cmd}</span>
      </div>
      <p>{getCmd(cmd)()}</p>
    </div>
  )
}

function CommandElement({ setPastCommands }: CMDProps) {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>();

  function handleOnEnter(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let v = inputRef.current.value;
      setPastCommands((prev: string[]) => [...prev, v]);

      if (v === "clear" || v === "cls") {
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

  return (
    <div className={"flex gap-2"}>
      <Prefix pwd="~" />
      <input className={`bg-transparent min-w-max outline-0 no-underline caret-white ${contains(value, COMMANDS) ? "text-green-500" : "text-red-500"}`}
        size={50}
        type="text"
        ref={inputRef}
        onInput={(e) => (setValue((e.target as HTMLInputElement).value))}
        maxLength={50}
        spellcheck={false}
        autoFocus={true}
        onBlur={(e) => { (e.target as HTMLInputElement).focus() }}
      />
    </div>
  )
}

export function Term() {
  const [pastCommands, setPastCommands] = useState<string[]>([]);

  return (
    <div class={"w-full rounded bg-zinc-800 p-1 pt-0 font-mono"}>
      {pastCommands.map((ele: string) => {
        return (
          <FinishedCommandElement cmd={ele} />
        )
      })}
      <CommandElement setPastCommands={setPastCommands} />
    </div>
  )
}
