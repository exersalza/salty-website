
export const COMMANDS = {
  hello: () => <p>sup [&gt;'-']&gt;</p>,
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
