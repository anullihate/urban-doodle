import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import { isBypassing } from '../../api/authAPI'
import orderAPI, { OrderItem } from '../../api/orderAPI'

const OrdersCreate = () => {
  const history = useHistory()
  const [error, setError] = useState(false)
  const [order, setOrder] = useState({
    Label: '',
    Reference: '',
    Description: '',
    Remarks: '',
    DeliveryDate: '',
    CreateDate: new Date().toISOString(),
    OrderType: {
      OrderTypeId: 1,
    },
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setOrder({ ...order, [name]: value })
  }
  const handleClick = async () => {
    if (!order.Label) {
      setError(true)
      return
    }
    await orderAPI.createOrder(order as OrderItem)
    history.push('/orders')
  }
  return (
    <>
      <Typography variant='h5'>Create Order</Typography>
      <Grid container spacing={3}>
        <Grid item>
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

export default OrdersCreate
