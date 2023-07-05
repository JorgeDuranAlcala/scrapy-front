import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"

import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import {
  UpdateUserForm,
  defaultUpdateUserForm, type UpdateUserCredentials
} from 'src/components/Forms'

import { updateCredentialsSchema } from "src/schemas"

// * Custom components
import { UserSettingsTabs } from "src/components/Navbars"

const Security = () => {
  const updateUserForm = useForm({
    defaultValues: defaultUpdateUserForm,
    mode: 'onBlur',
    resolver: yupResolver(updateCredentialsSchema)
  })

  const onSubmit = (data: UpdateUserCredentials) =>{
    console.log(data)
  }

  return(
    <Stack spacing={5}>
      <UserSettingsTabs/>
      <Card>
        <CardContent>
          <FormProvider {...updateUserForm}>
            <form
              onSubmit={updateUserForm.handleSubmit(onSubmit)}
            >
              <UpdateUserForm/>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </Stack>

  )
}

Security.acl = {
  action: 'update',
  subject: 'account-security'
}

export default Security
