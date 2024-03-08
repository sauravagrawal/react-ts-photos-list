import FavList from "./FavList"
import ListButton from "./ListButton"

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <ListButton />
            <FavList />
        </div>
    )
}

export default Dashboard
