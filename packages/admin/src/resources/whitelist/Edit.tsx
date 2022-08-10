import { TextInput, Edit, SimpleForm, required } from 'react-admin'

export const WhitelistEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="address" validate={[required()]} />
      </SimpleForm>
    </Edit>
  )
}
