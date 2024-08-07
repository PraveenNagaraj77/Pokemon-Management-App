Pokemon Management Application
This project is a Pokemon management application with a frontend and backend. The backend provides APIs for managing Pokemon and users, while the frontend interacts with these APIs to display and manipulate data.




Frontend:

URL: https://pokemon-management-app.vercel.app/


https://pokemon-management-app.vercel.app/create-pokemon-user - Create Pokemon Page
https://pokemon-management-app.vercel.app/list-pokemon-users - List Page
https://pokemon-management-app.vercel.app/add-pokemon - Add Pokemon Page

The frontend is developed using ReactJs. It provides a user interface for interacting with Pokemon and user data.

Features :
Home Page: Select a Pokemon owner and view their Pokemon.
Add Pokemon Page: Form to add a new Pokemon and assign it to an owner.
List of Pokemon Users: View all Pokemon users and their Pokemon and we can delete individual user and delete all users.
As per the Assignment documentation every functionality is done like autofilled user and pokemon abilities add button to navigate add pokemon page  and movement of pokemons using  buttons pokemon go to move , pokemon flee to alert , pokemon cease to freeze and etc

Additionally I have added a Navbar which navigates to the corresponding Pages
And Toast Notifications for Notifications

Frontend API Integration :

Fetch All Pokemon Users :
Endpoint: GET /users
Description: Retrieves a list of all Pokemon owners.

Fetch Pokemon by User
Endpoint: GET /pokemons/:id
Description: Retrieves a list of Pokemon owned by a specific user

Create Pokemon
Endpoint: POST /pokemons
Description: Adds a new Pokemon. Requires owner name, Pokemon name, ability, position, speed, and direction.
and pass the json

Update Pokemon

Endpoint: PUT /pokemons/:id
Description: Updates the details of a Pokemon by ID.


Backend:

URL: https://pokemon-management-app.onrender.com



https://pokemon-management-app.vercel.app/users
https://pokemon-management-app.vercel.app/pokemons

The backend is built with Node.js and Express. It provides APIs to manage Pokemon and user data stored in JSON files.

API Endpoints
Pokemon Endpoints

Get All Pokemon
Endpoint: GET /pokemons
Description: Retrieves a list of all Pokemon. Optionally filter by userId.

Get Pokemon by ID
Endpoint: GET /pokemons/:id
Description: Retrieves details of a specific Pokemon by id.

Create Pokemon
Endpoint: POST /pokemons
Description: Adds a new Pokemon and assigns it to an owner. Requires details of the Pokemon and the owner’s name.

Update Pokemon
Endpoint: PUT /pokemons/:id
Description: Updates details of an existing Pokemon.

Delete Pokemon
Endpoint: DELETE /pokemons/:id
Description: Deletes a Pokemon by ID. Removes the Pokemon and, if the owner has no other Pokemon, deletes the owner as well.


User Endpoints

Get All Users
Endpoint: GET /users
Description: Retrieves a list of all Pokemon owners.

Get User by id
Endpoint: GET /users/:id
Description: Retrieves details of a specific user by id.

Create User
Endpoint: POST /users
Description: Adds a new Pokemon owner. Requires the owner's name.

Update User
Endpoint: PUT /users/:id
Description: Updates details of an existing user.

Delete User
Endpoint: DELETE /users/:id
Description: Deletes a user by ID. If the user has Pokemon, they will be deleted as well.


Running Locally

Frontend :

npm install , npm start

Backed : 

npm install , npm start