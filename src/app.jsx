import DirectoryListener from "./comps/DirectoryListener.jsx";
import {useEffect} from "preact/hooks";
import {getRemoteRepos} from "./comps/utils/utils.js";

export function App() {
    return (
        <div className="bg-black p-5 h-screen w-screen grid place-items-center">
            <DirectoryListener />
        </div>
    )
}
