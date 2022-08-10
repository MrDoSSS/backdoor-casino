import feathersClient from './feathers-client'
import { Admin, Resource } from 'react-admin'
import { restClient } from 'ra-data-feathers'
import LoginPage from './pages/Login'
import authProvider from './auth-provider'
import {
  Users,
  ProductTiers,
  Settings,
  Whitelist,
  Products,
  Rewards,
} from './resources'

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category'
import ViewListIcon from '@mui/icons-material/ViewList'
import SettingsIcon from '@mui/icons-material/Settings'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

const restClientOptions = {
  id: '_id',
  users: {
    id: 'address',
  },
}

function App() {
  return (
    <Admin
      title={'Casino admin'}
      dataProvider={restClient(feathersClient, restClientOptions)}
      authProvider={authProvider}
      loginPage={LoginPage}
      requireAuth
    >
      <Resource name="users" list={Users.UsersList} icon={PeopleIcon} />
      <Resource
        name="product-tiers"
        list={ProductTiers.ProductTiersList}
        edit={ProductTiers.ProductTiersEdit}
        create={ProductTiers.ProductTiersCreate}
        icon={CategoryIcon}
        options={{ label: 'Product Tiers' }}
      />
      <Resource
        name="products"
        list={Products.ProductsList}
        create={Products.ProductsCreate}
        edit={Products.ProductsEdit}
        icon={ProductionQuantityLimitsIcon}
      />
      <Resource
        name="rewards"
        list={Rewards.RewardsList}
        create={Rewards.RewardsCreate}
        edit={Rewards.RewardsEdit}
        icon={EmojiEventsIcon}
      />
      <Resource
        name="whitelist"
        list={Whitelist.WhitelistList}
        create={Whitelist.WhitelistCreate}
        edit={Whitelist.WhitelistEdit}
        icon={ViewListIcon}
        options={{ label: 'Whitelist' }}
      />
      <Resource
        name="settings"
        list={Settings.SettingsList}
        create={Settings.SettingsCreate}
        edit={Settings.SettingsEdit}
        icon={SettingsIcon}
      />
    </Admin>
  )
}

export default App
