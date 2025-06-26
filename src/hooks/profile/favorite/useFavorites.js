import { useEffect } from "react"
import useFavoritesStore from "../../../mockStore/favoritesStore"

export const useFavorites = () => {
  const { favorites, isLoading, error, loadFavorites, addToFavorites, removeFromFavorites, toggleFavorite, reset } =
    useFavoritesStore()

  useEffect(() => {
    if (favorites.length === 0 && !isLoading) {
      loadFavorites()
    }
  }, [favorites.length, isLoading, loadFavorites])

  return {
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    reset,
    refetch: loadFavorites,
  }
}

export default useFavorites
