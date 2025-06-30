import { Header } from 'components'
import {GridComponent} from '@syncfusion/ej2-react-grids'
import { users } from '~/constants/trips'

const AllUsers = () => {
  return (
    <main className="all-users wrapper">
      <Header
      title="Manage Users"
      description="Filter, sort, and access detailed user profiles"
      />
      <GridComponent dataSource={users}>

      </GridComponent>
    </main>
  )
}

export default AllUsers
