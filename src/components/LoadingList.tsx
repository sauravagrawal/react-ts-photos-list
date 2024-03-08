import { useState, useEffect } from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Link } from 'react-router-dom';


interface Element {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const LoadingList: React.FC = () => {
    const [elements, setElements] = useState<Element[]>(JSON.parse(localStorage.getItem("elements") || "[]"));
    const [page, setPage] = useState<number>(Number(localStorage.getItem("page")) || 1);
    const [loading, setLoading] = useState<boolean>(false);
    const { favorites, toggleFavorite } = useFavorites();

    const fetchElements = async () => {
        try {
            setLoading(true);
            const prevData = [...elements]
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`);
            const data: Element[] = await response.json();
            setElements([...prevData, ...data]);
            setPage(prevPage => prevPage + 1);
            localStorage.setItem("elements", JSON.stringify([...prevData, ...data]))
            localStorage.setItem("page", JSON.stringify(page + 1))

            
        } catch (error) {
            console.error('Error fetching elements:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchElements();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            ) {
                fetchElements();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    return (
        <div className='loadingList'>
            <Link to="/" className="back-button">Home</Link>
            <h1>Photos List</h1>
            <div className="grid-container">
                {elements.map((element: Element, index: number) => (
                    <div key={index} className="grid-item">
                        <div>ID: {element.id}</div>
                        <div><strong>{element.title}</strong></div>
                        <img src={element.thumbnailUrl} alt={element.title} />
                        <button onClick={() => toggleFavorite(element)}>
                            {favorites.some(favorite => favorite.id === element.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                ))}
            </div>
            {loading && <div className="loading-spinner"></div>}
        </div>

    );
};

export default LoadingList;
