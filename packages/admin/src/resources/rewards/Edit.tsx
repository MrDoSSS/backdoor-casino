import { Edit, SimpleForm, required } from 'react-admin'
import { ReferenceInput, SelectInput } from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'

export const RewardsEdit = (props: any) => {
  return (
    <Edit {...props}>
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
    </Edit>
  )
}
