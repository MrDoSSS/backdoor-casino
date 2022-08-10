import { Create, SimpleForm, required } from 'react-admin'
import { ReferenceInput, SelectInput } from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'

export const RewardsCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <RichTextInput source="credential" validate={[required()]} />
        <ReferenceInput
          source="product"
          reference="products"
          validate={[required()]}
        >
          <SelectInput label="Product" optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}
