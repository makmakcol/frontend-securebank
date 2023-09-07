import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/Line";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Mock Users Transaction Data" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;