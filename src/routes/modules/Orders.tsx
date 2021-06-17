import { useState, useEffect, useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Pagination from '@material-ui/lab/Pagination'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ReactLoading from 'react-loading'
import Alert from '@material-ui/lab/Alert'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchOrders, selectOrder } from '../../reducers/order'
import orderAPI from '../../api/orderAPI'

const paginator = (items: [], page: number = 1, per_page: number = 10) => {
  let offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page)
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  }
}

const ConfirmationDialog = (props: any) => {
  const { onClose, open, pendingDeleteId, ...other } = props

  const handleEntering = () => {
    //
  }

  const handleCancel = () => {
    onClose(null)
  }

  const handleOk = () => {
    onClose(pendingDeleteId)
  }
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='xs'
      onEntering={handleEntering}
      aria-labelledby='confirmation-dialog-title'
      open={open}
      {...other}
    >
      <DialogTitle id='confirmation-dialog-title'>Delete</DialogTitle>
      <DialogContent>Are you sure?</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOk} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Orders = () => {
  const orders = useAppSelector((state) => state.order.orders)
  const count = Math.ceil(useAppSelector((state) => state.order.count) / 10)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  // const [offset, setOffset] = useState(0)
  const [open, setOpen] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const fetchOrdersAction = useMemo(
    () => async (currentPage: number) => {
      setLoading(true)
      await dispatch(fetchOrders({ limit: 10, offset: (currentPage - 1) * 10 }))
      setLoading(false)
    },
    [dispatch, setLoading]
  )

  useEffect(() => {
    setError('')
    fetchOrdersAction(page)
  }, [page, fetchOrdersAction])

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    // setOffset((page - 1) * 10)
    setPage(page)
  }

  const handleClose = async (value: number) => {
    if (value) {
      try {
        await orderAPI.deleteOrder(value)
        fetchOrdersAction(page)
      } catch (error) {
        setError(error.response.data.Message)
      }
    }
    setOpen(false)
  }
  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <ReactLoading type={'spinningBubbles'} color={'#000000'} />
      </Box>
    )
  }
  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      {error && <Alert severity='error'>{error}</Alert>}
      <Button
        variant='contained'
        fullWidth
        color='primary'
        style={{ marginBottom: 10 }}
        onClick={() => history.push('/orders/create')}
      >
        <strong>Create Order</strong>
      </Button>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>OrderId</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>DeliveryDate</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const {
                OrderId,
                Label,
                Reference,
                Description,
                Remarks,
                DeliveryDate,
              } = order
              return (
                <TableRow key={OrderId}>
                  <TableCell>{OrderId}</TableCell>
                  <TableCell>{Label}</TableCell>
                  <TableCell>{Reference}</TableCell>
                  <TableCell>{Description}</TableCell>
                  <TableCell>{Remarks}</TableCell>
                  <TableCell>{DeliveryDate}</TableCell>
                  <TableCell>
                    <Link to={`/orders/${OrderId}/edit`}>
                      <IconButton aria-label='edit'>
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label='delete'
                      onClick={() => {
                        setPendingDeleteId(OrderId)
                        setOpen(true)
                      }}
                    >
                      <DeleteIcon color='secondary' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        style={{ marginTop: 8 }}
      />
      <ConfirmationDialog
        open={open}
        keepMounted
        onClose={handleClose}
        pendingDeleteId={pendingDeleteId}
      />
    </Grid>
  )
}

export default Orders
