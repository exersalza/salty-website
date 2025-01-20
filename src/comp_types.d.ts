type Arg = {
  name: string;
  short?: string;
  long?: string;
}

type ArgList = {
  [key: string]: string;
}


type PastCommands = {
  cmd: Command,
  pwd: string,
}
