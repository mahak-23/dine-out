import { useEffect, useState, useCallback } from "react";
import { FOODFIRE_MENU_API_URL } from "../utils/constant.js";

const useRestaurantMenu = (resId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoized fetchData function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(FOODFIRE_MENU_API_URL + resId);
      const json = await response.json();
      setRestaurantInfo(json?.data);
    } catch (err) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, [resId]);

  useEffect(() => {
    if (resId) fetchData();
  }, [fetchData, resId]);

  return [loading, error, restaurantInfo];
};

export default useRestaurantMenu;
