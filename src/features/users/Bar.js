
import {  useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { colors } from "../../theme";
import { useGetAllDataQuery } from "./alldataApiSlice";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import useTitle from "../../hooks/useTitle";

const BarChart = ({ isDashboard }) => {
    useTitle('BAR CHART')
    const { username, isEditor, isAdmin } = useAuth()
    const theme = useTheme()
    const myColors = colors(theme.palette.mode)

    const {
        data: users,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetAllDataQuery()

    console.log("Users:", users);  // Log all user data
    console.log("Username from params:", username);  // Log username from params


    if (isLoading) return <CircularProgress />
    if (isError) return <p>Error: {error?.data?.message}</p>

    let filteredUsersArray = [];
    const usersArray = users ? users.ids.map(id => users.entities[id]) : [];

    if (isSuccess) {
        if (isEditor || isAdmin) {
            filteredUsersArray = [...usersArray]
        } else {
            filteredUsersArray = usersArray.filter(user => user.username === username)
        }

    
        console.log("Filtered Users Array:", filteredUsersArray);
    }

return (
    <ResponsiveBar
    data={filteredUsersArray.map(user => ({
        username: user.username,
        balance: user.balance,
    }))}

        theme={{
            axis: {
                domain: {
                    line: {
                        stroke: myColors.grey[100]
                    }
                },
                legend: {
                    text: {
                        fill: myColors.grey[100]
                    }
                },
                ticks: {
                    line: {
                        stroke: myColors.grey[100],
                        strokeWidth: 1,   
                    },
                    text: {
                        fill: myColors.grey[100]
                    }
                }

            },
            legends: {
                text: {
                    fill: myColors.grey[100]
                }
            }
        }}
        keys={[
            'balance'
        ]}
        indexBy="username"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
        ]}
        borderColor={{
            from: "color",
            modifiers: [["darker", "1.6"]]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "user",
            legendPosition: "middle",
            legendOffset: 32,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "amount", 
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={
            myColors.grey[100]
          }
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          barAriaLabel={function (e) {
            return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
          }}
        />
)

}

export default BarChart