import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const alldataAdapter = createEntityAdapter({})

const initialState = alldataAdapter.getInitialState()

export const alldataApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllData: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 60, 
            transformResponse: responseData => {
                const loadedData = responseData.map(user => ({
                    ...user,
                   id: user._id
                }));
                return alldataAdapter.setAll(initialState, loadedData)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'AllData', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'AllData', id }))
                    ]
                } else return [{ type: 'AllData', id: 'LIST '}]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'AllData', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'AllData', id: arg.id}
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'AllData', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetAllDataQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = alldataApiSlice

// returns the query result object
export const selectAllDataResult = alldataApiSlice.endpoints.getAllData.select()

// creates memoized selector
const selectUsersData = createSelector(
    selectAllDataResult,
    alldataResult => alldataResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring 
export const {
    selectAll: selectAllData,
    selectById: selectAllDataById,
    selectIds: selectAllDataIds
    // Pass in a selector that returns the all data slice of state
} = alldataAdapter.getSelectors(state => selectUsersData(state) ?? initialState)