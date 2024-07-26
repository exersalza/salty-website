import { workspaceSwitcher } from "..";

import { useEffect, useState } from "preact/hooks"

// todo:
//  implement recovery from api overload 

function Card({ v }: any) {
  // updated_at, language, stargazers_count, license
  return (
    <div class={"h-48 w-64 rounded bg-zinc-700/50 border-zinc-600 border p-2 py-1"}>
      <div class={"flex"}>
        <a href={v.html_url} class={"font-semibold"}>{v.full_name}</a>
      </div>
    </div>
  )
}

export function Things() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (workspaceSwitcher.value !== 2 || cards.length !== 0) {
      return
    }

    fetch("https://api.github.com/users/exersalza/repos").then(async (d) => {
      if (d.status !== 200) {
        return;
      }

      let ret = [];

      for (let i of await d.json()) {
        if (!i.fork) {
          ret.push(i);
        }
      }
      setCards(ret);
    })
  }, [workspaceSwitcher.value])

  return (
    <div class={"w-full rounded bg-zinc-800 p-4 md:px-12 overflow-auto"}>
      <div class={"flex flex-wrap gap-2 place-content-center"}>
        {
          cards.map((v) => {
            return <Card v={v} />
          })
        }
      </div>
    </div>
  )
}
