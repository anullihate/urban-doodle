import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link, useParams, useHistory } from 'react-router-dom'
import { DummyOrdersInterface } from '../../dummy-orders'
import { isBypassing } from '../../api/authAPI'
import orderAPI, { OrderItem } from '../../api/orderAPI'
import { useAppSelector } from '../../hooks'

const OrderEdit = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const orders = useAppSelector((state) => state.order.orders)
  const [error, setError] = useState(false)
  const [order, setOrder] = useState<OrderItem>({
    OrderId: 0,
    Label: '',
    Reference: '',
    Description: '',
    Remarks: '',
    DeliveryDate: '',
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setOrder({ ...order, [name]: value })
  }
  useEffect(() => {
    if (!orders.length) {
      history.push('/orders')
    }
    setOrder(
      orders.find(
        (item: OrderItem) => item.OrderId === parseInt(id)
      ) as OrderItem
    )
  }, [])
  const handleClick = async () => {
    try {
      await orderAPI.updateOrder({
        OrderId: order.OrderId,
        Label: order.Label,
        Reference: order.Reference,
        Description: order.Description,
        Remarks: order.Remarks,
        DeliveryDate: order.DeliveryDate,
        CreateDate: order.CreateDate,
        OrderType: order.OrderType,
      })
      history.push('/orders')
    } catch (error) {
      //
    }
  }
  return (
    <>
      <Typography variant='h5'>Edit Order</Typography>
      <Grid container spacing={3}>
        <Grid item>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='orderid'
            label='OrderId'
            name='OrderId'
            autoComplete='orderid'
            autoFocus
            value={order.OrderId}
            onChange={handleChange}
            disabled
          />
          <TextField
            variant='outlined'
            margin='normal'
            error={error}
            required
            fullWidth
            name='Label'
            label='Label'
            type='label'
            id='label'
            autoComplete='label'
            value={order.Label}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='Reference'
            label='Reference'
            type='reference'
            id='reference'
            autoComplete='reference'
            value={order.Reference}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='Description'
            label='Description'
            type='description'
            id='description'
            autoComplete='description'
            value={order.Description}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='Remarks'
            label='Remarks'
            type='remarks'
            id='remarks'
            autoComplete='remarks'
            value={order.Remarks}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='DeliveryDate'
            label='DeliveryDate'
            type='deliverydate'
            id='deliverydate'
            autoComplete='deliverydate'
            value={order.DeliveryDate}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container justify='flex-end'>
        <Link to='/orders'>
          <Button variant='contained' style={{ marginRight: 10 }}>
            Cancel
          </Button>
        </Link>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleClick()}
        >
          Save
        </Button>
      </Grid>
    </>
  )
}

export default OrderEdit
