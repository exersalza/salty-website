type Command = [content: () => JSX.Element, description: string, args?: Arg[]];

type Arg = {
  name: string;
  short?: string;
  long?: string;
}

type ArgList = {
  [key: string]: string;
}


type PastCommands = {
  cmd: string,
  pwd: string,
  args?: string[]
}
