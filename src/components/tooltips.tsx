import { useEffect, useState } from "preact/hooks"

export function ToolTip({ color, mountElement }: { color: string, mountElement: HTMLElement }) {
  const [pos, setPos] = useState({top: 0, left: 0});

  // positioning
  useEffect(() => {
    
  })

  return (
    <div className={"absolute"} style={pos}>

    </div>
  )
}
