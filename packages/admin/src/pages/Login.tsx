import { MouseEvent } from 'react'
import { useLogin, useNotify, Button } from 'react-admin'
import * as web3 from '../web3'

const Login = () => {
  const login = useLogin()
  const notify = useNotify()

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()

    const nonce = 1231
    const signature = await web3.instance.eth.personal.sign(
      web3.instance.utils.utf8ToHex(`I am signing my nonce: ${nonce}`),
      web3.currentAccount,
      ''
    )

    try {
      await login({
        address: web3.currentAccount,
        signature: signature,
      })
    } catch {
      notify('Something went wrong', { type: 'error' })
    }
  }

  return (
    <Button variant="contained" onClick={handleSubmit}>
      <div>Sign in</div>
    </Button>
  )
}

export default Login
