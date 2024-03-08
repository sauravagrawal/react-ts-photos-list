import { Link } from "react-router-dom"

const ListButton: React.FC = () => {

    return (
        <div className="list-button">
            <Link to="/list">Photos List</Link>
        </div>
    )
}

export default ListButton