export const API_BASE_URL = "https://foodfire.onrender.com";

// Image CDN URL for Restaurant card
export const IMG_CDN_URL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/`;

// Image CDN URL for Restaurant Menu
export const ITEM_IMG_CDN_URL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/`;

// Swiggy API to get Restaurant data using foodfire server
export const FOODFIRE_API_URL = `${API_BASE_URL}/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING`;

// Swiggy API to get Restaurant Menu data using foodfire server
export const FOODFIRE_MENU_API_URL = `${API_BASE_URL}/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=`;

// Swiggy Restaurant Path
export const SWIGGY_REST_API_PATH = `data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants`;

// Social Media Links - URL
export const LINKEDIN_URL = "https://www.linkedin.com/in/mahak-k-100971232/";
export const GiTHUB_LINK = "https://github.com/mahak-23";
export const EMAIL_LINK = "mailto:mahak1923k@gmal.com";

// Github - username and repository name
export const GITHUB_USERNAME = "mahak-23";
export const GITHUB_REPOSITORY_NAME = "dine-out";

// Github API for User
export const GITHUB_USER_API = "https://api.github.com/users/";

// Github API for Repository
export const GITHUB_REPO_API = "https://api.github.com/repos/";
