import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../users/Bar";

const Bar = () => {
return (
    <Box
    m="20px">
    <Header title="Bar Chart" subtitle="User Balance" />
    <Box height = "75vh">
        <BarChart />
    </Box>
    </Box>
)
}

export default Bar;