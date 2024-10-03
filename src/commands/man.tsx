const manPages: Record<string, any> = {
  "hello": [{ title: "test" }, { normal: "normal text" }, { indent: "indent text" }]
}

function getManPage(page: string) {
  let v = manPages[page];

  if (v === undefined) {
    return [{normal: "Command has no Manpage."}]
  }

  return v;
}

export function Man(args: ArgList) {
  return (
    <div>
      {
        getManPage(args["command"]).map((text) => {
          
        })
      }
    </div>
  )
}
