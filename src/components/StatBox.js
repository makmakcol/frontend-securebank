import { Box, Typography, useTheme } from "@mui/material";
import { colors } from "../theme";


const StatBox = ({ title, subtitle, icon, increase }) => {
    const theme = useTheme()
    const myColors = colors(theme.palette.mode)

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography variant="h4" fontWeight="bold" sx={{ color: myColors.grey[100] }}>
            {title}
          </Typography>
          <Typography variant="h6" sx={{ color: myColors.grey[200] }}>
            {subtitle}
          </Typography>
        </Box>
                </Box>
            </Box>
    )
}

export default StatBox