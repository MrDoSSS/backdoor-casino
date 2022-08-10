import { TextInput, Edit, SimpleForm, required } from 'react-admin'

export const SettingsEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="key" validate={[required()]} />
        <TextInput source="value" validate={[required()]} />
      </SimpleForm>
    </Edit>
  )
}
