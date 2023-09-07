import { ResponsivePie } from "@nivo/pie";
import { colors } from "../../theme";
import { useTheme } from "@mui/material";
import { useGetAllDataQuery } from "./alldataApiSlice";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import useTitle from "../../hooks/useTitle";



const PieChart = ({ isDashboard }) => {
  useTitle('PIE CHART')
  console.log("PieChart is being rendered. isDashboard:", isDashboard);
  const { username, isEditor, isAdmin } = useAuth()
  const theme = useTheme();
  const myColors = colors(theme.palette.mode);

  const {
    data: users,
    isSuccess,
    isLoading,
    isError,
    error
} = useGetAllDataQuery()

if (isLoading) return <CircularProgress />
if (isError) return <p>Error: {error?.data?.message}</p>


let filteredUsersArray = [];
  const usersArray = users ? users.ids.map((id) => users.entities[id]) : [];

  if (isSuccess) {
    if (isEditor || isAdmin) {
      filteredUsersArray = [...usersArray];
    } else {
      filteredUsersArray = usersArray.filter((user) => user.username === username);
    }
  }

const roleCounts = filteredUsersArray.reduce((acc, user) => {
  const role = user.roles;  // Assuming roles is a string like 'admin', 'editor', etc.
  acc[role] = (acc[role] || 0) + 1;
  return acc;
}, {});

const pieData = Object.keys(roleCounts).map(role => ({
  id: role,
  label: role,
  value: roleCounts[role]
}));


console.log('Pie Data:', pieData);  // To log the pieData
console.log('Dimensions:', isDashboard ? { top: 20, right: 40, bottom: 40, left: 40 } : { top: 40, right: 80, bottom: 80, left: 80 });  // To log the dimensions




  return (
    <ResponsivePie
      data={pieData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: myColors.grey[100],
            },
          },
          legend: {
            text: {
              fill: myColors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: myColors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: myColors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: myColors.grey[100],
          },
        },
      }}
      keys={[
        'roles'
    ]}
   
      margin={isDashboard ? { top: 20, right: 40, bottom: 40, left: 40 } : { top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={isDashboard ? 0.3 : 0.5} 
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={myColors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.8}
      arcLabelsSkipAngle={6}
      arcLabelsTextColor={myColors.grey[100]}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 30,
          translateY: 56,
          itemsSpacing: 20,
          itemWidth: 120,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;