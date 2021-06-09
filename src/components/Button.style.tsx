import styled from 'styled-components'
import MaterialButton from '@material-ui/core/Button'

const Button = styled(({ children, ...others }) => (
  <MaterialButton variant='contained' disableElevation {...others}>
    {children}
  </MaterialButton>
))`
  background-color: #6772e5;
  color: #fff;
  &:hover {
    background-color: #5469d4;
  }
`

export default Button
