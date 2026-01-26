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
> | name          | type     | data type | where | description                         |
> | ------------- | -------- | --------- | ----- | ----------------------------------- |
> | `name`        | required | string    | body  | name of the recipe to create        |
> | `description` | optional | string    | body  | description of the recipe to create |

##### Responses
> | http code | description of answer                                       |
> | --------- | ----------------------------------------------------------- |
> | `201`     | `Recipe was created. The id is also returned in the answer` |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>PATCH</code> <code><b>/recipe/{recipe_id}</b></code> <code>(update a recipe)</code></summary>

##### Parameters
> | name          | type     | data type | where | description                                   |
> | ------------- | -------- | --------- | ----- | --------------------------------------------- |
> | `recipe_id`   | required | int       | url   | id of the recipe to update                    |
> | `name`        | optional | string    | body  | new name for the recipe (if changing)         |
> | `description`| optional | string    | body  | new description for the recipe (if changing) |

##### Responses
> | http code | description of answer                              |
> | --------- | -------------------------------------------------- |
> | `200`     | `Recipe updated successfully`                     |
> | `400`     | `Invalid input data`                               |
> | `404`     | `Recipe with given id doesn't exist`               |
> | `403`     | `User is not the owner of the recipe`              |
> | `401`     | `Unauthenticated request`                          |

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
> | `403`     | `The request was sent by a user which was not the owner of the recipe` |
> | `401`     | `The request was sent by an unauthenticated user`    |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>GET</code> <code><b>/recipe/{recipe_id}/steps/</b></code> <code>(gets all the steps of the recipe)</code></summary>

##### Parameters
> | name        | type     | data type | where | description                                     |
> | ----------- | -------- | --------- | ----- | ----------------------------------------------- |
> | `recipe_id` | required | int       | body   | id of the recipe that we want to get the steps from |

##### Responses
> | http code | description of answer |
> | --------- | --------------------- |
> | `200`     | `All steps where sent` |
> | `404`     | `Recipe with given id doesn't exist` |

</details>

<!-------------------------------------------------------------------------->

## Step related

<details>
 <summary><code>GET</code> <code><b>/recipe/{recipe_id}/steps/{step_id}</b></code> <code>(gets a specific step)</code></summary>

##### Parameters
> | name        | type     | data type | where | description                 |
> | ----------- | -------- | --------- | ----- | --------------------------- |
> | `recipe_id` | required | int       | url   | id of the parent recipe    |
> | `step_id`   | required | int       | url   | id of the step to retrieve |

##### Responses
> | http code | description of answer                                 |
> | --------- | ----------------------------------------------------- |
> | `200`     | `Step details`                                        |
> | `404`     | `Recipe or step with given id doesn't exist`          |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>POST</code> <code><b>/recipe/{recipe_id}/steps/</b></code> <code>(create a step for a recipe)</code></summary>

##### Parameters
> | name          | type     | data type | where | description                                 |
> | ------------- | -------- | --------- | ----- | ------------------------------------------- |
> | `recipe_id`   | required | int       | url   | id of the recipe to which the step belongs |
> | `order`       | required | int       | body  | order number of the step within the recipe |
> | `instruction` | required | string    | body  | text describing the step                    |

##### Responses
> | http code | description of answer                                 |
> | --------- | ----------------------------------------------------- |
> | `201`     | `Step created. The id is returned in the answer`      |
> | `400`     | `Invalid input data`                                   |
> | `404`     | `Recipe with given id doesn't exist`                  |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>PATCH</code> <code><b>/recipe/{recipe_id}/steps/{step_id}</b></code> <code>(update a step)</code></summary>

##### Parameters
> | name          | type     | data type | where | description                                 |
> | ------------- | -------- | --------- | ----- | ------------------------------------------- |
> | `recipe_id`   | required | int       | url   | id of the parent recipe                     |
> | `step_id`     | required | int       | url   | id of the step to update                    |
> | `order`       | optional | int       | body  | new order number (if changed)               |
> | `instruction` | optional | string    | body  | new instruction text (if changed)           |

##### Responses
> | http code | description of answer                                 |
> | --------- | ----------------------------------------------------- |
> | `200`     | `Step updated successfully`                           |
> | `400`     | `Invalid input data`                                   |
> | `404`     | `Recipe or step with given id doesn't exist`          |
> | `403`     | `User is not the owner of the step`                  |
> | `401`     | `Unauthenticated request`                             |

</details>

<!-------------------------------------------------------------------------->

<details>
 <summary><code>DELETE</code> <code><b>/recipe/{recipe_id}/steps/{step_id}</b></code> <code>(delete a step)</code></summary>

##### Parameters
> | name        | type     | data type | where | description                 |
> | ----------- | -------- | --------- | ----- | --------------------------- |
> | `recipe_id` | required | int       | url   | id of the parent recipe    |
> | `step_id`   | required | int       | url   | id of the step to delete   |

##### Responses
> | http code | description of answer                                 |
> | --------- | ----------------------------------------------------- |
> | `200`     | `Step deleted successfully`                           |
> | `404`     | `Recipe or step with given id doesn't exist`          |
> | `403`     | `User is not the owner of the step`                   |
> | `401`     | `Unauthenticated request`                             |

</details>