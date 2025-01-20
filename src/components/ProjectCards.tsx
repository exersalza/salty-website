import { workspaceSwitcher } from "..";
import { useEffect, useRef, useState } from "preact/hooks"
import { Icons } from "./Icons";

// todo:
//  implement recovery from api overload 

// the higher the less effectfull it is
const CONSTRAIN = 300;
const TRANSLATION_TABLE = {
  "#": "sharp",
  "+": "plus",
}


// most normal java function name
function arrayObjKeyValueSearch(input: Record<string, any>, key: string, value: string): number | null {
  let ret = null;
  input.forEach((obj: Record<string, any>, index: number) => {
    Object.entries(obj).forEach(([innerKey, innerValue]) => {
      if (innerKey === key && innerValue === value) {
        ret = index;
        return
      }
    })
  })

  return ret
}

function transform(x: number, y: number, element: HTMLDivElement) {
  let box = element.getBoundingClientRect();

  let calcX = -(y - box.y - (box.height / 2)) / CONSTRAIN;
  let calcY = (x - box.x - (box.width / 2)) / CONSTRAIN;

  return "perspective(100px) "
    + `   rotateX(${calcX}deg) `
    + `   rotateY(${calcY}deg) `
    + "   translateZ(0) ";
}

function transformElement(el: HTMLDivElement, xyEl: any) {
  el.style.transform = transform.apply(null, xyEl);
}

function Archived({ show }: { show: boolean }) {
  return (
    <div className={`${show ? "" : "hidden"} bg-yellow-300/70 h-6 w-[14.875rem] z-50 absolute bottom-8 rounded flex place-items-center justify-center`}>
      <p>Archived</p>
    </div>
  )
}


function Card({ cardData }: any) {
  // updated_at, language, stargazers_count, license
  let language: string = cardData.language?.toLowerCase() ?? "archlinux";
  let description: string = cardData.description ?? "";

  console.log(cardData.created_at)
  let creationDate = new Date(cardData.created_at);

  let cardRef = useRef<HTMLDivElement>(null);

  if (description.length >= 120) {
    description = description.slice(0, 120) + "...";
  }

  if (description.length <= 0) {
    description = "No Description...";
  }

  // just so we can find the icon
  if (language === "shell") language = "bash";

  Object.entries(TRANSLATION_TABLE).forEach(([key, value]) => {
    // IT DOES EXIST FRICK YOU
    language = language.replaceAll(key, value);
  });

  const animate = (e: MouseEvent) => {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([cardRef.current]);

    window.requestAnimationFrame(() => {
      transformElement(cardRef.current, position);
    })
  }

  useEffect(() => {
    let ref = cardRef.current;

    let i = setInterval(() => {
      if (ref.matches(":hover")) return;

      ref.style.transform = ""
    }, 10);

    return () => {
      clearInterval(i);
    }
  }, [])

  return (
    <div class={"h-48 w-64 rounded origin-center bg-zinc-700/50 border-zinc-600  hover:border-zinc-500 border p-2 py-1 subpixel-antialiased will-change-transform transition-color"}
      ref={cardRef}
      onMouseMove={animate}
    >
      <Archived show={cardData.archived} />
      <div className={"flex flex-col gap-2 h-full w-full"}>
        <div class={"flex h-6 "}>
          <a href={cardData.html_url} target={"_blank"} class={"font-semibold flex place-items-center gap-1"}>
            <i class={`devicon-${language}-plain`}></i>
            {cardData.name}
          </a>
        </div>
        <div className={"h-32 w-full"}>
          <p className={"block text-ellipsis w-60 text-balance text-clip break-words"}>
            {description}
          </p>
        </div>
        <div className={"flex h-6 w-full self-end place-items-center place-content-between"}>
          <div className={"flex place-items-center gap-1 select-none"}>
            {Icons.star}
            {cardData.stargazers_count}
          </div>
          <div className={"flex gap-1 select-none"}>
            <p>Created on</p>
            <p>{creationDate.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Things() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // if we're not on the site, we dont want to render it.
    if (workspaceSwitcher.value !== 2 || cards.length !== 0) return;

    fetch("https://api.github.com/users/exersalza/repos").then(async (d) => {
      if (!d.ok) {
        console.log(d.status)
        return;
      }

      let fetched_data: Record<string, any>[] = await d.json();
      let data = fetched_data.filter((value) => !value.fork);
      //                                       key     value
      data.splice(arrayObjKeyValueSearch(data, "name", "exersalza"), 1);
      setCards(data);
    })
  }, [workspaceSwitcher.value])

  return (
    <div class={"w-full rounded bg-zinc-800 p-4 md:px-12 overflow-auto"}>
      <div class={"flex flex-wrap gap-2 place-content-center"}>
        {
          cards.map((v) => {
            return <Card cardData={v} />
          })
        }
      </div>
    </div>
  )
}
