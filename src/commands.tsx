export class Args {
  name = ""
  short = ""
  long = ""
  desc = ""
  mandatory = false


  // idk what the word is but we ball
  constructor(name: string, short?: string, long?: string, description?: string) {
    this.name = name;
    this.desc = description ?? "";

    this.short = short ?? "";
    this.long = long ?? "";

    if (this.short === "" && this.long === "") {
      this.mandatory = true;
      console.log("MAKE ME TRUE")
    }
  }
}

type IdkYet = {}

export class ArgParse {
  private internalArgs: Args[] = []

  constructor() {

  }

  addArg(arg: Args) {
    this.internalArgs.push(arg);
  }

  parseArgs(toParse: string): IdkYet[] {
    const args = this.sortArgs();
    const splitedInput = toParse.split(" ");
    const command = splitedInput.splice(0, 1);
    const mands = this.countMands(args);

    splitedInput.forEach((value, index) => {
    })

  }

  private sortArgs(): Args[] {
    let internalArgsCopy = this.internalArgs;
    let newArray = [];

    internalArgsCopy.forEach((value, index) => {
      if (value.mandatory) {
        // prob stupid but who cares ... i care  FIX: later
        newArray.push(this.internalArgs.splice(index, 1)[0]);
      }
    });

    newArray = newArray.concat(...internalArgsCopy);
    return newArray
  }

  private countMands(args: Args[]): number {
    let count = 0;
    args.forEach((value) => { if (value.mandatory) count += 1 });

    return count;
  }
}

class Command {
  name = ""
  args = []

  constructor(name: string, args?: Args[]) {
    this.name = name;
    this.args = args;
  }
}

class Commands {
  private commands: Command[] = []

  constructor() { }

  getCommands(): Command[] { }

  registerCommand(cmd: Command) { }
  unregisterCommand(cmd: Command) { }
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
