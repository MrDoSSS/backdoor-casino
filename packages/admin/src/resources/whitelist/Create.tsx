import { TextInput, Create, SimpleForm, required } from 'react-admin'
import * as web3 from '../../web3'

export const WhitelistCreate = (props: any) => {
  const transform = async ({ address }: { address: string }) => {
    address = address.toLowerCase()
    const signature = await web3.instance.eth.personal.sign(
      web3.instance.utils.keccak256(address),
      web3.currentAccount,
      ''
    )

    return { address, signature }
  }
  return (
    <Create {...props} transform={transform}>
      <SimpleForm>
        <TextInput source="address" validate={[required()]} />
      </SimpleForm>
    </Create>
  )
}
