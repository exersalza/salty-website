import { Component, ComponentChild, RenderableProps } from "preact"
import { useState } from "preact/hooks"
import { Command } from "vscode-css-languageservice"

export class Arg {
  name = ""
  short = ""
  long = ""
  desc = ""
  mandatory = false
  takes = 0


  // idk what the word is but we ball
  /**
   *  @param name         The name of the argument
   *  @param short        The short arg trigger, starts with one '-'
   *  @param long         the long arg trigger, starts with two '-'
   *  @param takes        Takes N many arguments
   *  @param description  description, what did you expect?
   *
   * */
  constructor(name: string, short?: string, long?: string, description?: string, takes?: number) {
    this.name = name;
    this.desc = description ?? "";

    this.short = short ?? "";
    this.long = long ?? "";
    this.takes = takes ?? 0;

    this.mandatory = this.short === "" && this.long === "";

  }
}


type IdkYet = {}

export class ArgParse {
  private internalArgs: Arg[] = []

  constructor() {

  }

  addArg(arg: Arg) {
    this.internalArgs.push(arg);
  }

  parseArgs(toParse: string): IdkYet[] {
    const args = this.sortArgs();
    const splitedInput = toParse.split(" ");
    const command = splitedInput.splice(0, 1);
    const mands = this.countMands(args);

    splitedInput.forEach((value, index) => {

    })

    return splitedInput;
  }

  private sortArgs(): Arg[] {
    let internalArgsCopy = this.internalArgs;
    let newArray = [];

    internalArgsCopy.forEach((value, index) => {
      if (value.mandatory) {
        // prob stupid but who cares ... i care  FIX: later, its later now, fix later
        newArray.push(this.internalArgs.splice(index, 1)[0]);
      }
    });

    newArray = newArray.concat(...internalArgsCopy);
    return newArray
  }

  private countMands(args: Arg[]): number {
    let count = 0;
    args.forEach((value) => { if (value.mandatory) count += 1 });

    return count;
  }
}

interface CommandProps {
  name: string,
  args?: Arg[]
}


function Command(props: CommandProps) {
  const [state,  setState] = useState<CommandProps>(props);

  return (
    <div>

    </div>
  )
}


function Default() {
  return <p>We aint serving that here, sorry</p>
}

interface CommandNotFoundProps {
  cmd: string;
}

export function Empty() {
  return (<></>)
}

export function CommandNotFound(props: CommandNotFoundProps) {
  return <p>{`salt: command not found: ${props.cmd}`}</p>
}
