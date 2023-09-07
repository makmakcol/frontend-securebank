import { store } from '../../app/store'
import { alldataApiSlice } from '../users/alldataApiSlice'
import { balanceApiSlice } from '../balance/balanceApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'



const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const alldata = store.dispatch(alldataApiSlice.endpoints.getAllData.initiate())
        const balance = store.dispatch(balanceApiSlice.endpoints.getBalance.initiate())

        return () => {
            console.log('unsubscribing')
            alldata.unsubscribe()
            balance.unsubscribe()
        }
    }, [])

  return <Outlet />
}

export default Prefetch