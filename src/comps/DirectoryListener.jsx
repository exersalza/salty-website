import {useEffect, useState} from "preact/hooks";
import {Icons} from "./Icons.jsx";
import DirectoryParentItem from "./DirectoryParentItem.jsx";
import {getRemoteRepos} from "./utils/utils.js";
import Markdown from "react-markdown";

export default function DirectoryListener() {
    const folder_icons = [Icons.folder(), Icons.folder_open()];
    const activeItem = useState("");
    const [items, setItems] = useState({
        Projects: {
            icons: [Icons.folder(), Icons.folder_open()],
            toggled: false,
            children: [{icon: Icons.document(), name: "Loading...", active: false}]
        },
        MoreProjects: {
            icons: [Icons.folder(), Icons.folder_open()],
            toggled: false,
            children: [{icon: Icons.document(), name: "Yup", active: false}]
        }
    });

    useEffect(() => {
        async function getRepos() {
            try {
                const remoteRepos = await getRemoteRepos();
                const updatedProjects = remoteRepos.map(repo => {
                    return ({
                        name: repo.name,
                        lang: repo.language ? repo.language.toLowerCase() : undefined,
                        stars: repo.stargazers_count,
                        url: repo.url,
                        readme: `${repo.url}/${repo.default_branch}/README.md`,
                        icon: (Icons[repo.language?.toLowerCase()] ?? Icons.document())
                    })
                });
                setItems(prevItems => (
                    {...prevItems, Projects: {...prevItems.Projects, children: updatedProjects}}
                ))
            } catch (e) {
                console.error("Failed to fetch remote repositories: ", e);
            }
        }

        getRepos();
    }, []);

    function toggleItem(name) { // yep javascript stuff happening here
        setItems(prevItems => ({
            ...prevItems,
            [name]: {
                ...prevItems[name],
                toggled: !prevItems[name].toggled
            }
        }))
    }

    function toggleActive(name) {
        setItems(prevItems => ({
            ...Object.fromEntries(Object.entries(prevItems).map(([k, v]) => [
                k,
                {
                    ...v,
                    children: value.children.map(child => ({
                        ...child,
                        active: child.name === name
                    }))
                }
            ]))
        }))
    }

    return (
        <div
            className="h-full w-full rounded-xl border border-gray-500 p-4 select-none grid grid-cols-[auto_1fr] gap-4 overflow-hidden transition-all">
            <div className={"overflow-auto max-h-full"}>
                <div className={"overflow-y-auto"}>
                    <div className="flex gap-4 flex-col">
                        {
                            Object.entries(items).map(([k, v]) => (
                                <DirectoryParentItem name={k}
                                                     onClick={toggleItem}
                                                     icon={v.toggled ? v.icons[1] : v.icons[0]}
                                                     toggled={v.toggled}
                                                     children={v.children}
                                                     toggleChild={toggleActive}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={"border-l w-full h-full border-gray-500"}>
                <div className={"h-full w-full"}>
                    <Markdown>{}</Markdown>
                </div>
            </div>
        </div>
    )
}