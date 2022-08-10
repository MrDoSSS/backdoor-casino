import { Hook, HookContext } from '@feathersjs/feathers'
import { setField, iff } from 'feathers-hooks-common'
import checkPermissions from 'feathers-permissions'

export default (): Hook => {
  return async (context: HookContext) => {
    context = (await checkPermissions({
      roles: ['admin'],
      error: false,
    })(context)) as HookContext

    context = iff(
      (ctx) => !ctx.params.permitted,
      setField({ from: 'params.user.address', as: 'params.query.address' })
    )(context) as HookContext

    return context
  }
}
