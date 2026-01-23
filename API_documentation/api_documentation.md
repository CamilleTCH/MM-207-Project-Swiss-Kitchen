# API documentation

_inspired by : https://gist.github.com/azagniotov/a4b16faf0febd12efbc6c3d7370383a6_

## Recipe related

<details>
 <summary><code>GET</code> <code><b>/recipe/</b></code> <code>(gets all recipes)</code></summary>

##### Parameters

> None

##### Responses

> | http code | description of answer                  | response |
> | --------- | -------------------------------------- | -------- |
> | `200`     | `All available recipe in the database` | string   |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>GET</code> <code><b>/recipe/{recipe_id}</b></code> <code>(gets one recipe)</code></summary>

##### Parameters

> | name        | type     | data type | where | description             |
> | ----------- | -------- | --------- | ----- | ----------------------- |
> | `recipe_id` | required | int       | url   | id of the recipe to get |

##### Responses

> | http code | description of answer                        |
> | --------- | -------------------------------------------- |
> | `200`     | `Information related to the given recipe id` |
> | `404`     | `Recipe with given id doesn't exist`         |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>POST</code> <code><b>/recipe/</b></code> <code>(create a recipe)</code></summary>

##### Parameters

> > | name          | type     | data type | where | description                         |
> > | ------------- | -------- | --------- | ----- | ----------------------------------- |
> > | `name`        | required | string    | body  | name of the recipe to create        |
> > | `description` | optional | string    | body  | description of the recipe to create |

##### Responses

> | http code | description of answer                                       |
> | --------- | ----------------------------------------------------------- |
> | `201`     | `Recipe was created. The id is also returned in the answer` |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>DELETE</code> <code><b>/recipe/{recipe_id}</b></code> <code>(delete one recipe)</code></summary>

##### Parameters

> | name        | type     | data type | where | description                |
> | ----------- | -------- | --------- | ----- | -------------------------- |
> | `recipe_id` | required | int       | url   | id of the recipe to delete |

##### Responses

> | http code | description of answer                                 |
> | --------- | ----------------------------------------------------- |
> | `200`     | `The recipe, and all related steps have been deleted` |
> | `404`     | `Recipe with given id doesn't exist`                  |
> | `403`     | `The request was sent by a user which was not the owner of the recipe`                  |
> | `401`     | `The request was sent by an unauthenticated user`                  |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>GET</code> <code><b>/recipe/{recipe_id}/steps/</b></code> <code>(gets all the steps of the recipe)</code></summary>

##### Parameters

> | name        | type     | data type | where | description             |
> | ----------- | -------- | --------- | ----- | ----------------------- |
> | `recipe_id` | required | int       | body   | id of the recipe that we want to get the steps from |

##### Responses

> | http code | description of answer                        |
> | --------- | -------------------------------------------- |
> | `200`     | `All steps where sent` |
> | `404`     | `Recipe with given id doesn't exist`         |

</details>


