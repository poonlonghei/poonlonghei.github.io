export type GitHubRepository = {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  language: string | null;
  fork: boolean;
  latestCommitMessage?: string | null;
};

const profile = "poonlonghei";

export async function getRecentRepositories(): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${profile}/repos?sort=pushed&per_page=100&type=owner`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return [];

    const repositories: unknown = await response.json();
    if (!Array.isArray(repositories)) return [];

    const recentRepositories = repositories
      .filter((repository): repository is GitHubRepository =>
        typeof repository?.name === "string" &&
        typeof repository?.html_url === "string" &&
        typeof repository?.pushed_at === "string" &&
        typeof repository?.fork === "boolean",
      )
      .filter((repository) => !repository.fork)
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .slice(0, 6);

    return Promise.all(
      recentRepositories.map(async (repository) => {
        try {
          const commitResponse = await fetch(
            `https://api.github.com/repos/${profile}/${encodeURIComponent(repository.name)}/commits?per_page=1`,
            {
              headers: { Accept: "application/vnd.github+json" },
              next: { revalidate: 3600 },
            },
          );

          if (!commitResponse.ok) return { ...repository, latestCommitMessage: null };

          const commits: unknown = await commitResponse.json();
          const firstCommit = Array.isArray(commits) ? commits[0] : null;
          const commit = firstCommit && typeof firstCommit === "object" && "commit" in firstCommit
            ? firstCommit.commit
            : null;
          const message = commit && typeof commit === "object" && "message" in commit
            ? commit.message
            : null;
          const latestCommitMessage = typeof message === "string" ? message.split("\n")[0] : null;

          return { ...repository, latestCommitMessage };
        } catch {
          return { ...repository, latestCommitMessage: null };
        }
      }),
    );
  } catch {
    return [];
  }
}
