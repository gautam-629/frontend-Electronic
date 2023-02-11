import { useContext } from "react"
import UserContext from "../../context/UserContext"
const Home = () => {

    const userContext = useContext(UserContext);

    return (
        <div>
            {console.log(userContext)}
            {JSON.stringify(userContext)}
            <h1>user is logged in  - {userContext.isLogin + ''}</h1>
            <h1>Welcome {userContext.userData?.user?.gender}</h1>

        </div>
    )
}

export default Home