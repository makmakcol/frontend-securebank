
import { useSelector } from "react-redux";
import { selectBalanceById } from "./balanceApiSlice";

const Balance = ({ balanceId }) => {
    
    const balance = useSelector(state => selectBalanceById(state, balanceId))

   

    if (!balance) return null;

    return (
        <div>
            <p>{balance.username}</p>
        </div>
    )
}

export default Balance