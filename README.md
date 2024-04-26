## Endpoints

### Users

<details>
  <summary>
    <code>POST</code> 
    <code>/Users/Login</code> 
    Login de Users
  </summary>
  
  #### Parameters

> | name     | type     | data type | description   |
> | -------- | -------- | --------- | ------------- |
> | email    | required | string    | User e-mail   |
> | password | optional | string    | User password |

#### Responses

> | http code | content-type       | response                                               |
> | --------- | ------------------ | ------------------------------------------------------ |
> | `200`     | `application/json` | `{"msg": "Login succesful"}`                           |
> | `403`     | `application/json` | `{"msg": "Forbidden"}`                                 |
> | `404`     | `application/json` | `{"msg": "User not found"}`                            |
> | `400`     | `application/json` | `{"msg": "Missing parameters: 'email' or 'password'"}` |

</details>

<details>
  <summary>
    <code>GET</code> 
    <code>/Users</code> 
    Get user information
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response                                                                      |
> | --------- | ------------------ | ----------------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"firstname": "Jordi", "lastname": "Galobart", "email": "test@example.com"}` |

</details>
