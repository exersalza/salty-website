import { JSX } from "preact";
import { COMMANDS } from "../commands";

const keybinds = [
  [ "Alt_l + 1-9", "Switches Workspaces (only the ones in the top left)" ]
]

export function Help(): JSX.Element {
  return (
    <div className={"flex flex-col"}>
      <p>Help page</p>
      <br />
      <br />
      <p>All commands currently available:</p>
      <br />
      {Object.keys(COMMANDS).map((command, index) => (
        <div key={index} className={"flex flex-col"}>
          <p>{command}</p> 
          <p className={"ml-4"}>{COMMANDS[command][1]}</p>
        </div>
      ))}
      <br />
      <p>use: man &lt;command&gt; to get more information about a commmand</p>
      <br />
      {keybinds.map(([bind, desc]) => {
        return <div className={"flex flex-col"}>
          <p>{bind}</p>
          <p className={"ml-4"}>{desc}</p>
        </div>
      })}
    </div>
  )
}
