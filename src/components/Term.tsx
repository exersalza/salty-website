import { createRef } from "preact";
import { useEffect, useState } from "preact/hooks";

const COMMANDS = { hello: "sup [>'-']>" };

interface CmdProps {
  cmd?: string
}

interface PrefixProps {
  pwd: string
}

function Prefix(props: PrefixProps) {
  return <span class="">
    <span className={"text-green-500"}>➜ </span> <span className="text-cyan-400">{props.pwd}</span>
  </span>
}

function FinishedCommandElement({ cmd }: CmdProps) {
  return (
    <div>
      <div className={"flex gap-2"}>
        <Prefix pwd={"~"} /><span>{cmd}</span>
      </div>
      <p>{COMMANDS[cmd]}</p>
    </div>
  )
}

function CommandElement({ }) {
  const [cmd, setCmd] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const inputRef = createRef<HTMLInputElement>();

  return (
    <div className={"flex gap-2"}>
      <Prefix pwd="~" />
      <input className={"bg-transparent min-w-max outline-0"}
        size={50} 
        ref={inputRef} 
        onInput={() => {setValue(inputRef.current.value)}}
        value={value}
      />
    </div>
  )
}

export function Term() {
  const [pastCommands, setPastCommands] = useState<Array<string>>(["hello"]);

  return (
    <div class={"w-full rounded bg-zinc-800 p-1 pt-0 font-mono"}>
      {pastCommands.map((ele: string) => {
        return (
          <FinishedCommandElement cmd={ele} />
        )
      })}
      <CommandElement />
    </div>
  )
}
