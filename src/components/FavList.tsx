import { useFavorites } from '../../contexts/FavoritesContext';

const FavList: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="fav-list-container">
      {
        favorites.length > 0 ? <h2>Favorite Photos</h2> : null
      }
      
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            <div>ID: {favorite.id}</div>
            <div>Title: {favorite.title}</div>
            <img src={favorite.thumbnailUrl} alt={favorite.title} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FavList