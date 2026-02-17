const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch<T>(
  path: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  return res.json();
}
