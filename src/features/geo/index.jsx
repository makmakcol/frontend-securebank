import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/Geo";
import Header from "../../components/Header";
import { colors } from "../../theme";

const Geography = () => {
  const theme = useTheme();
  const myColors = colors(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Mock User Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${myColors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;