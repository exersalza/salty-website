import { JSX } from "preact";
import { COMMANDS } from "../commands";

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
    </div>
  )
}
