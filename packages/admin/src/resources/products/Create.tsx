import { TextInput, Create, SimpleForm, required } from 'react-admin'
import { ReferenceInput, SelectInput } from 'react-admin'

export const ProductsCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <TextInput source="subtitle" validate={[required()]} />
        <ReferenceInput
          source="tier"
          reference="product-tiers"
          validate={[required()]}
        >
          <SelectInput label="Tier" optionText="name" />
        </ReferenceInput>
        <TextInput source="icon" validate={[required()]} />
      </SimpleForm>
    </Create>
  )
}
