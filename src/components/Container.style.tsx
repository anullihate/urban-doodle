import styled from 'styled-components'
import MaterialContainer from '@material-ui/core/Container'

const Container = styled(({ component, children, ...others }) => (
  <MaterialContainer component={component} {...others}>
    {children}
  </MaterialContainer>
))``

export default Container
