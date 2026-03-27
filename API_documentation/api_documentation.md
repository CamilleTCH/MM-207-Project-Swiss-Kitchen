
# API Documentation

Inspired by: https://gist.github.com/azagniotov/a4b16faf0febd12efbc6c3d7370383a6

---

# Authentication

This API uses JWT authentication.

Protected routes require the following header:

Authorization: Bearer <token>

### Possible errors

| HTTP Code | Description              |
|----------|--------------------------|
| 401      | Unauthenticated request  |
| 403      | Unauthorized action      |

---

# Recipe Related

## Recipe Structure

```json
{
  "id": 1,
  "name": "Pasta",
  "description": "Delicious pasta",
  "dish_type": "main_dish",
  "difficulty_level": "easy",
  "creator_user_id": 2,
  "steps": []
}
````

### Constraints

* dish_type: "starter" | "main_dish" | "dessert"
* difficulty_level: "easy" | "medium" | "hard"

---

## GET /recipe/

Gets all recipes.

### Parameters

None

### Responses

| HTTP Code | Description           |
| --------- | --------------------- |
| 200       | All available recipes |

---

## GET /recipe/{recipe_id}

Gets a specific recipe.

### Parameters

| Name      | Type     | Data Type | Location | Description      |
| --------- | -------- | --------- | -------- | ---------------- |
| recipe_id | required | int       | url      | ID of the recipe |

### Responses

| HTTP Code | Description      |
| --------- | ---------------- |
| 200       | Recipe data      |
| 404       | Recipe not found |

---

## POST /recipe/

Creates a recipe.

### Parameters

| Name             | Type     | Data Type | Location | Description        |
| ---------------- | -------- | --------- | -------- | ------------------ |
| name             | required | string    | body     | Recipe name        |
| description      | optional | string    | body     | Recipe description |
| dish_type        | required | string    | body     | Type of dish       |
| difficulty_level | required | string    | body     | Difficulty level   |
| creator_user_id  | optional | int       | body     | Creator ID         |
| steps            | optional | array     | body     | List of steps      |

### Step Object

| Name                      | Type     | Data Type |
| ------------------------- | -------- | --------- |
| step_number               | required | int       |
| name                      | required | string    |
| estimated_time_in_seconds | required | int       |

### Responses

| HTTP Code | Description     |
| --------- | --------------- |
| 201       | Recipe created  |
| 400       | Invalid input   |
| 401       | Unauthenticated |

---

## PATCH /recipe/{recipe_id}

Updates a recipe.

### Parameters

| Name             | Type     | Data Type | Location | Description     |
| ---------------- | -------- | --------- | -------- | --------------- |
| recipe_id        | required | int       | url      | Recipe ID       |
| name             | optional | string    | body     | New name        |
| description      | optional | string    | body     | New description |
| dish_type        | optional | string    | body     | New dish type   |
| difficulty_level | optional | string    | body     | New difficulty  |

### Responses

| HTTP Code | Description      |
| --------- | ---------------- |
| 200       | Recipe updated   |
| 400       | Invalid input    |
| 404       | Recipe not found |
| 403       | Not owner        |
| 401       | Unauthenticated  |

---

## DELETE /recipe/{recipe_id}

Deletes a recipe.

### Parameters

| Name      | Type     | Data Type | Location | Description |
| --------- | -------- | --------- | -------- | ----------- |
| recipe_id | required | int       | url      | Recipe ID   |

### Responses

| HTTP Code | Description      |
| --------- | ---------------- |
| 200       | Recipe deleted   |
| 404       | Recipe not found |
| 403       | Not owner        |
| 401       | Unauthenticated  |

---

## GET /recipe/{recipe_id}/steps/

Gets all steps of a recipe.

### Parameters

| Name      | Type     | Data Type | Location | Description |
| --------- | -------- | --------- | -------- | ----------- |
| recipe_id | required | int       | url      | Recipe ID   |

### Responses

| HTTP Code | Description      |
| --------- | ---------------- |
| 200       | Steps list       |
| 404       | Recipe not found |

---

# Step Related

## Step Structure

```json
{
  "id": 1,
  "related_recipe_id": 2,
  "step_number": 1,
  "name": "Boil water",
  "description": "Heat water",
  "estimated_time_in_seconds": 300
}
```

---

## GET /recipe/{recipe_id}/steps/{step_id}

Gets a specific step.

### Parameters

| Name      | Type     | Data Type | Location | Description |
| --------- | -------- | --------- | -------- | ----------- |
| recipe_id | required | int       | url      | Recipe ID   |
| step_id   | required | int       | url      | Step ID     |

### Responses

| HTTP Code | Description |
| --------- | ----------- |
| 200       | Step data   |
| 404       | Not found   |

---

## POST /recipe/{recipe_id}/steps/

Creates a step.

### Parameters

| Name                      | Type     | Data Type | Location | Description      |
| ------------------------- | -------- | --------- | -------- | ---------------- |
| recipe_id                 | required | int       | url      | Recipe ID        |
| step_number               | required | int       | body     | Step order       |
| name                      | required | string    | body     | Step name        |
| description               | optional | string    | body     | Step description |
| estimated_time_in_seconds | required | int       | body     | Time estimate    |

### Responses

| HTTP Code | Description      |
| --------- | ---------------- |
| 201       | Step created     |
| 400       | Invalid input    |
| 404       | Recipe not found |

---

## PATCH /recipe/{recipe_id}/steps/{step_id}

Updates a step.

### Parameters

| Name                      | Type     | Data Type | Location | Description     |
| ------------------------- | -------- | --------- | -------- | --------------- |
| recipe_id                 | required | int       | url      | Recipe ID       |
| step_id                   | required | int       | url      | Step ID         |
| step_number               | optional | int       | body     | New order       |
| name                      | optional | string    | body     | New name        |
| description               | optional | string    | body     | New description |
| estimated_time_in_seconds | optional | int       | body     | New time        |

### Responses

| HTTP Code | Description     |
| --------- | --------------- |
| 200       | Step updated    |
| 400       | Invalid input   |
| 404       | Not found       |
| 403       | Not owner       |
| 401       | Unauthenticated |

---

## DELETE /recipe/{recipe_id}/steps/{step_id}

Deletes a step.

### Parameters

| Name      | Type     | Data Type | Location | Description |
| --------- | -------- | --------- | -------- | ----------- |
| recipe_id | required | int       | url      | Recipe ID   |
| step_id   | required | int       | url      | Step ID     |

### Responses

| HTTP Code | Description     |
| --------- | --------------- |
| 200       | Step deleted    |
| 404       | Not found       |
| 403       | Not owner       |
| 401       | Unauthenticated |

---

# User Related

## GET /users/{id}

Gets user information.

### Parameters

| Name | Type     | Data Type | Location | Description |
| ---- | -------- | --------- | -------- | ----------- |
| id   | required | int       | url      | User ID     |

### Responses

| HTTP Code | Description     |
| --------- | --------------- |
| 200       | User data       |
| 404       | User not found  |
| 401       | Unauthenticated |

---

## POST /users/register

Creates a user.

### Parameters

| Name     | Type     | Data Type | Location | Description |
| -------- | -------- | --------- | -------- | ----------- |
| username | required | string    | body     | Username    |
| email    | required | string    | body     | Email       |
| password | required | string    | body     | Password    |

### Responses

| HTTP Code | Description               |
| --------- | ------------------------- |
| 201       | User created              |
| 400       | Missing fields            |
| 409       | Conflict (already exists) |

---

## POST /users/login

Authenticates a user.

### Parameters

| Name     | Type     | Data Type | Location | Description |
| -------- | -------- | --------- | -------- | ----------- |
| email    | required | string    | body     | Email       |
| password | required | string    | body     | Password    |

### Responses

| HTTP Code | Description         |
| --------- | ------------------- |
| 200       | Returns JWT token   |
| 401       | Invalid credentials |

### Example Response

```json
{
  "token": "jwt_token_here"
}
```

---

# Error Format

```json
{
  "error": "Error message"
}
```
