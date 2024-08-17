
export const COMMANDS = {
  hello: () => <p>sup [&le;'-']&le;</p>,
  clear: () => { },
  cls: () => { },
  ls: () => <Ls />
};


function Ls() {
  return (
    <span>
      test
    </span>
  )
}
