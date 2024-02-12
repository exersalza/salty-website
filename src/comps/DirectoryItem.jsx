export default function DirectoryItem({icon, name, toggle, index}) {
    return (
        <div data-index={index}
             data-name={name}
            className="ml-2 mt-1 rounded h-10 w-80 border border-gray-500 text-gray-300 flex justify-start items-center pl-2 gap-2 hover:bg-white/10 hover:cursor-pointer"
            onClick={toggle}>
            <div className={"flex flex-row justify-between"}>
                <div className={"flex flex-row gap-2"}>
                    <div className="">
                        {icon}
                    </div>
                    <div>
                        <p>
                            {name}
                        </p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}