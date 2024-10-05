import { JSX } from "preact";
import { COMMANDS } from "../commands";
import { WORKSPACES, WORKSPACES_DESC } from "../components/Header";

const keybinds = [
  ["Alt_l + 1-9", "Switches Workspaces (only the ones in the top left)"]
]

export function Help(): JSX.Element {
  return (
    <div className={"flex flex-col"}>
      <p className={"font-semibold"}>Help page</p>
      <br />
      <p>All commands currently available:</p>
      <br />
      {Object.keys(COMMANDS).map((command, index) => {
        if (String(command) === "__EMPTY__") return <></>

        return (
          <div key={index} className={"flex flex-col"}>
            <p className={""}>{command}</p>
            <p className={"ml-4"}>{COMMANDS[command][1]}</p>
          </div>
        )
      })}
      <br />
      <p>use: man &lt;command&gt; to get more information about a commmand</p>
      <br />
      <p className={"font-semibold"}>Keybinds</p>
      {keybinds.map(([bind, desc]) => {
        return <div className={"flex flex-col"}>
          <p>{bind}</p>
          <p className={"ml-4"}>{desc}</p>
        </div>
      })}
      <br />
      <p className={"font-semibold"}>Workspaces (top left numbers)</p>
      {WORKSPACES.map((v, index) => (
        <div key={index} className={"flex flex-col"}>
          <p className={""}>{v}</p>
          <p className={"ml-4"}>{WORKSPACES_DESC[index]}</p>
        </div>
      ))}
    </div>
  )
}
