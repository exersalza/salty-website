import { Dispatch, StateUpdater, useEffect, useRef, useState } from "preact/hooks";
import { contains, parseCommandArgs } from "../utils";
import { Arg, ArgParse, Command} from "../commands";

export let PWD = "~";
export const CMD_LENGTH = 64;

interface CMDProps {
  setPastCommands: Dispatch<StateUpdater<PastCommands[]>>,
  pastCommands?: PastCommands[]
}

interface PrefixProps {
  pwd: string
}

function Prefix(props: PrefixProps) {
  return (
    <span>
      <span className={"text-green-500"}>➜ </span> <span className="text-cyan-400">{props.pwd}</span>
    </span>
  )
}


function CommandElement({ setPastCommands }: CMDProps) {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>();

  function handleOnEnter(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let pastCmds: any;
      let [v, args] = parseCommandArgs(inputRef.current.value);

      if (contains(v, ["clear", "cls"])) { // special commands
        pastCmds = [];
      } else {
        pastCmds = (prev: PastCommands[]) => ([...prev, { cmd: v, pwd: PWD, args: args }]);
      }

      setPastCommands(pastCmds);

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
      <Prefix pwd={String(PWD)} />
      <input className={`bg-transparent min-w-max outline-0 no-underline caret-white`}
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
  const cmd = new Command("test");
  const [pastCommands, setPastCommands] = useState<PastCommands[]>([{ cmd: cmd, pwd: "~" }]);
  let argparse = new ArgParse();

  argparse.addArg(new Arg("cool_argument2", "-s"));
  argparse.addArg(new Arg("cool_argument"));
  let args = argparse.parseArgs("should_not_print aychar -h needs help");
  console.log(args)

  return (
    <div class={"w-full rounded bg-zinc-800 p-1 pt-0 font-mono overflow-y-auto"}>
      <div>
        {pastCommands.map(({cmd, pwd}) => {
          return cmd.render();
      
        })}
      </div>
      <CommandElement setPastCommands={setPastCommands} />
    </div>
  )
}
