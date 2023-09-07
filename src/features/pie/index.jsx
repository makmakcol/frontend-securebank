import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../users/PieChart";

const Pie = () => {
return (
    <Box
    m="20px">
    <Header title="Pie Chart" subtitle="User Roles" />
    <Box height = "75vh">
        <PieChart />
    </Box>
    </Box>
)
}

export default Pie;