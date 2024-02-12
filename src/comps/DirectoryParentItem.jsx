import DirectoryItem from "./DirectoryItem.jsx";

export default function DirectoryParentItem({children, icon, name, onClick, toggled, toggleChild}) {
    return (
        <div>
            <div data-name={name}
                 className="rounded h-10 w-96 border border-gray-500 text-gray-300 flex justify-start items-center pl-2 gap-2 hover:bg-white/10 hover:cursor-pointer"
                 onClick={onClick}>
                <div className="">
                    {icon}
                </div>
                <p>
                    {name}
                </p>
            </div>
            <div className={`${toggled ? "block" : "hidden"}`}>
                {children.map((node, i) => {
                    return <DirectoryItem name={node.name} icon={node.icon} toggle={toggleChild} index={i} />
                })}
            </div>
        </div>
    )
}