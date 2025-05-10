import { useState, useEffect, useCallback } from "react";
import { FOODFIRE_API_URL, SWIGGY_REST_API_PATH } from "../utils/constant";

const useRestaurantsList = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRestaurantsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(FOODFIRE_API_URL);
      const json = await response.json();
      const restaurants = eval("json?." + SWIGGY_REST_API_PATH) || [];

      setRestaurantList(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (err) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurantsData();
  }, [fetchRestaurantsData]);

  return [
    loading,
    error,
    restaurantList,
    filteredRestaurants,
    setFilteredRestaurants,
  ];
};

export default useRestaurantsList;
