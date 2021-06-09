import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import orderAPI, { GetOrdersParams, Orders, OrderItem } from '../api/orderAPI'
import { RootState } from '../store'

export interface OrderState {
  orders: OrderItem[]
  count: number
}

const initialState: OrderState = {
  orders: [],
  count: 0,
}

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (attributes?: GetOrdersParams) => {
    const response = await orderAPI.getOrders(attributes)
    return response.data
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchOrders.fulfilled,
      (state, action: PayloadAction<Orders>) => {
        state.orders = action.payload.Items
        state.count = action.payload.Count
      }
    )
  },
})

export const selectOrder = (state: RootState) => state.order

export default orderSlice.reducer
