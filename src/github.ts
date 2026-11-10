export type GitHubRepository = {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  language: string | null;
  fork: boolean;
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

    return repositories
      .filter((repository): repository is GitHubRepository =>
        typeof repository?.name === "string" &&
        typeof repository?.html_url === "string" &&
        typeof repository?.pushed_at === "string" &&
        typeof repository?.fork === "boolean",
      )
      .filter((repository) => !repository.fork)
      .slice(0, 6);
  } catch {
    return [];
  }
}
