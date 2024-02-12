import {
    mdiLanguageC,
    mdiLanguageCpp,
    mdiLanguageCsharp,
    mdiLanguageLua,
    mdiLanguageJavascript,
    mdiLanguageRust,
    mdiLanguagePython,
    mdiStar,
    mdiFile,
    mdiFolder,
    mdiFolderOpen
} from "@mdi/js";
import {Icon} from "@mdi/react";

export const Icons = {
    folder: function () {
        return (<Icon path={mdiFolder} size={1} color={"white"}/>)
    },
    folder_open: function () {
        return (<Icon path={mdiFolderOpen} size={1} color={"white"}/>)
    },
    document: function () {
        return (<Icon path={mdiFile} size={1} color={"white"}/>)
    },
    python: function () {
        return (<Icon path={mdiLanguagePython} color={"white"} size={1}/>)
    },
    "c++": function () {
        return (<Icon path={mdiLanguageCpp} color={"white"} size={1}/>)
    },
    c: function () {
        return (<Icon path={mdiLanguageC} color={"white"} size={1}/>)
    },
    javascript: function () {
        return (<Icon path={mdiLanguageJavascript} color={"white"} size={1}/>)
    },
    "c#": function () {
        return (<Icon path={mdiLanguageCsharp} color={"white"} size={1}/>)
    },
    lua: function () {
        return (<Icon path={mdiLanguageLua} color={"white"} size={1}/>)
    },
    rust: function () {
        return (<Icon path={mdiLanguageRust} color={"white"} size={1}/>)
    },
    star: function () {
        return (<Icon path={mdiStar} color={"white"} size={1}/>)
    }
}