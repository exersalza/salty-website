type Command = [content: () => JSX.Element, description: string];

enum ArgType {
  OPTIONAL,
  MANDATORY // there is another word for it, but I don't know it
}

type Arg = {
  _type: ArgType,
  name: string
}
