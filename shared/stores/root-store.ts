import AuthStore from './AuthStore'
import CartStore from './CartStore'

export default class RootStore {
  readonly auth = new AuthStore()
  readonly cart = new CartStore()
}
