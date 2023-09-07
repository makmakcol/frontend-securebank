import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const balanceAdapter = createEntityAdapter({})

const initialState = balanceAdapter.getInitialState()

export const balanceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBalance: builder.query({
            query: (username) => `/balance?username=${username}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                if (responseData && typeof responseData === 'object' && responseData.username) {
                    const transformedData = [{
                        id: responseData.username, 
                        username: responseData.username,
                        balance: responseData.balance
                    }];
                    return balanceAdapter.setAll(initialState, transformedData);
                }
                throw new Error("Unexpected structure for responseData: " + JSON.stringify(responseData));
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Balance', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Balance', id }))
                    ]
                } else return [{ type: 'Balance', id: 'LIST '}]
            }
        }),
        initialDeposit: builder.mutation({
            query: ({username, amount }) => ({
                url: '/balance', 
                method: 'POST',
                body: {  username, amount }
            }),
            invalidatesTags: [{ type: 'Balance', id: 'LIST' }]
        }),
        deposit: builder.mutation({
            query: ({ username, amount }) => ({
                url: '/balance/deposit',
                method: 'PATCH',
                body: { username, amount }
            }),
            invalidatesTags: [{ type: 'Balance', id: 'LIST' }]
        }),
        withdraw: builder.mutation({
            query: ({ username, amount }) => ({
                url: '/balance/withdraw',
                method: 'PATCH',
                body: { username, amount }
            }),
            invalidatesTags: [{ type: 'Balance', id: 'LIST' }]
        }),
    })
})

export const {
    useGetBalanceQuery,
    useInitialDepositMutation,
    useDepositMutation,
    useWithdrawMutation
} = balanceApiSlice

// returns the query result object
export const selectBalanceResult = balanceApiSlice.endpoints.getBalance.select()

// creates memoized selector
const selectBalanceData = createSelector(
    selectBalanceResult,
    balanceResult => balanceResult.data
)

//getSelectors creates these selectors and we rename them with aliases using destructuring 
export const {
    selectAll: selectAllBalance,
    selectById: selectBalanceById,
    selectIds: selectBalanceIds
} = balanceAdapter.getSelectors(state => selectBalanceData(state) ?? initialState)

