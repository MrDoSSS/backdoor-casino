import { TextInput, Create, SimpleForm, required } from 'react-admin'
import { ReferenceInput, SelectInput } from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'

export const ProductsCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <ReferenceInput
          source="tier"
          reference="product-tiers"
          validate={[required()]}
        >
          <SelectInput label="Tier" optionText="name" />
        </ReferenceInput>
        <RichTextInput source="description" />
      </SimpleForm>
    </Create>
  )
}
