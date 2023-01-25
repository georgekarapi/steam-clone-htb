const baseUrl = 'https://htb-steam-api.vercel.app/api/';

const fetchApi = async (query) => {
  return fetch(baseUrl + query)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));
};

export const fetchTrending = () => fetchApi('apps?tab=new_and_trending');

export const fetchTopSellers = () => fetchApi('apps?tab=top_sellers');

export const fetchBeingPlayed = () => fetchApi('apps?tab=being_played');

export const fetchUpcoming = () => fetchApi('apps?tab=upcoming');

export const fetchGameInfo = (gameId) => fetchApi(`apps?appid=${gameId}`);

// Reduce loadtime as API is static
export const fetchAllTabs = () => {
  return Promise.all([fetchTrending(), fetchUpcoming(), fetchTopSellers(), fetchBeingPlayed()]).then((res) => ({
    trending: { key: 'trending', label: 'New and Trending', data: [...res[0]] },
    topSellers: { key: 'topSellers', label: 'Top Sellers', data: [...res[1]] },
    lastPlayed: { key: 'lastPlayed', label: "What's Being Played", data: [...res[2]] },
    upcoming: { key: 'upcoming', label: 'Upcoming', data: [...res[3]] },
  }));
};
