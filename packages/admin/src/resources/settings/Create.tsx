import { TextInput, Create, SimpleForm, required } from 'react-admin'

export const SettingsCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="key" validate={[required()]} />
        <TextInput source="value" validate={[required()]} />
      </SimpleForm>
    </Create>
  )
}
