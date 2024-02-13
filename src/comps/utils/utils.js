const URL = "https://api.github.com/users/exersalza/repos";

export async function getRemoteRepos() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data.filter(repo => !repo.fork);
    } catch (error) {
        console.error("Error fetching remote repositories:", error);
        return [];
    }
}
