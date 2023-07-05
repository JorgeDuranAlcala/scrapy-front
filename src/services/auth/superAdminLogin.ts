import { restRequest } from "src/services/rest-requests";
import { UserDataType } from "src/types";

interface SuperAdminLogin extends UserDataType {
  accessToken: string
}

const superAdminLogin = async (email: string, password: string): Promise<SuperAdminLogin> => {
  return await restRequest('POST', '/core/auth/login', {
    body: {
      email,
      password
    }
  })
}

export default superAdminLogin
