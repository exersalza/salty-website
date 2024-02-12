
const URL = "https://api.github.com/users/exersalza/repos";

export function getRemoteRepos() {
    return fetch(URL).then(r => {
        const reader = r.body.getReader();
        let own_repos = [];

        function readNext() {
            return reader.read().then(({value, done}) => {
                if (done) {
                    return;
                }
                let data = undefined;

                const decoder = new TextDecoder('utf-8');
                try {
                    data = JSON.parse(decoder.decode(value));
                } catch (e) {
                    return readNext(); // restart if json is invalid, happens sometimes
                }
                for (let i in data) {
                    let j = data[i];
                    if (!j.fork) {
                        own_repos.push(j)
                    }
                }
                return readNext()
            });
        }

        return readNext().then(() => own_repos); // why js why
    });
}