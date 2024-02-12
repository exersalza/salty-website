import {useEffect, useState} from "preact/hooks";
import {Icons} from "./Icons.jsx";
import DirectoryParentItem from "./DirectoryParentItem.jsx";
import {getRemoteRepos} from "./utils/utils.js";

export default function DirectoryListener() {
    const folder_icons = [Icons.folder(), Icons.folder_open()];
    const [items, setItems] = useState({
        Projects: {
            icons: folder_icons, toggled: false, children: [
                {icon: Icons.document(), name: "Loading...", active: false},
            ]
        },
        MoreProjects: {
            icons: folder_icons, toggled: false, children: [
                {icon: Icons.document(), name: "Yup", active: false},
            ]
        }
    });

    useEffect(async () => {
        getRemoteRepos().then((d) => {
            let ret = [];

            for (let i in d) {
                let f = d[i];
                let lang = String(f.language).toLowerCase();
                if (lang === "null") {
                    lang = undefined;
                }

                ret.push({
                    name: f.name,
                    lang: f.language,
                    stars: f.stargazers_count,
                    url: f.url,
                    icon: (Icons[lang] ?? Icons.document)()
                });

            }

            setItems({...items, Projects: {...items.Projects, children: ret}})
        }).catch((e) => console.error(e))
    }, []);

    function toggleItem(e) { // yep javascript stuff happening here
        let name = e.target.dataset.name;
        setItems(prevItems => ({
            ...prevItems,
            [name]: {
                ...prevItems[name],
                toggled: !prevItems[name].toggled
            }
        }))
    }

    function toggleActive(e) {
        const target = e.target.dataset;
        const name = target.name;
        let local = {};

        Object.entries(items).map(([k, v]) => {
            let kids = [];
            for (let i in v.children) {
                kids.push({...v.children[i], active: v.children[i].name === name})
            }
            local[k] = {...v, children: [...kids]};
        });
        setItems(local);
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
                                                     icon={v.toggled ? Icons.folder_open() : Icons.folder()}
                                                     toggled={v.toggled}
                                                     children={v.children}
                                                     toggleChild={toggleActive}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={"border-l w-full h-full border-gray-500"}>
            </div>
        </div>
    )
}