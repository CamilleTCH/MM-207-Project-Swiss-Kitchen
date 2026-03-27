# Swiss Kitchen

Swiss kitchen is my personal project for class MM-207 at University of agder. It allows users to create recipes and to see the ones that other users created.


## Structure

- backend : everything related to the backend. Mostly the API, and also the code sql of the database.
- frontend : the frontend files.
- API_documentation : folder that contains schema of the databse, documentation of the api, and an export of the Insomnia queries I used to test the api.

## How to use

The root folder of this project is the "backend" folder. You can run the project the following way :

1. Create a .env file containing with the following variables

```.env
DATABASE_URL=postgresql://swisskitchendb_user:UQPaX5TI7oSfiFkssTtGG5utQPnreb32@dpg-d736ra3uibrs73f98b9g-a.frankfurt-postgres.render.com/swisskitchendb

PORT=3000

JWT_SECRET=dc44f47b8a5ae225a7ef0b0fc62070af7636bd5859fdeed70910bd3def0d073217bc3946d8ec9fbd435d9fb95f26bbbc6415e9d820af75668639ed8240bfbc4d
```

2. Run "npm run dev" from the backend folder.



The url of the webservice is : https://mm-207-project-swiss-kitchen.onrender.com/

## Practical information

The database expiry date is 26 of april 2026. At this date, the Render database will be deleted. In case of need for a new instance, let me know at camillet@uia.no