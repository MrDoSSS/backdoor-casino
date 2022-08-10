import {
  AuthenticationBaseStrategy,
  AuthenticationRequest,
} from '@feathersjs/authentication'
import { NotAuthenticated } from '@feathersjs/errors'
import { AddedAccount } from 'web3-core'

export class Web3Strategy extends AuthenticationBaseStrategy {
  get configuration() {
    const authConfig = this.authentication!.configuration
    const config = super.configuration || {}
    return {
      ...authConfig,
      ...config,
    }
  }

  get web3Account() {
    return this.app!.get('web3Account') as AddedAccount
  }

  async getEntity(id: string) {
    const entityService = this.entityService

    if (entityService === null) {
      throw new NotAuthenticated('Could not find entity service')
    }
    return entityService.get(id)
  }

  // @ts-ignore
  async authenticate(authentication: AuthenticationRequest) {
    const { entity } = this.configuration
    const { address, signature } = authentication

    if (!address || !signature) {
      throw new NotAuthenticated('Address or signature are empty')
    }

    const result = await this.getEntity(address)

    return {
      authentication: { strategy: this.name },
      [entity]: result,
    }
  }
}
