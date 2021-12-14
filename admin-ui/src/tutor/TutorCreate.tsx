import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  SelectArrayInput,
  DateTimeInput,
  TextInput,
} from "react-admin";

export const TutorCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <SelectArrayInput
          label="Courses"
          source="courses"
          choices={[
            { label: "Math", value: "Math" },
            { label: "English", value: "English" },
            { label: "Science", value: "Science" },
            { label: "Other", value: "Other" },
          ]}
          optionText="label"
          optionValue="value"
        />
        <DateTimeInput label="Date" source="date" />
        <TextInput label="Email" source="email" type="email" />
        <TextInput label="Name" source="name" />
      </SimpleForm>
    </Create>
  );
};
