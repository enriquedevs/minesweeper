# Minesweeper

Minesweeper game developed on Flask and React.

## Project setup

This repo has two projects:
- Flask API for Minesweeper backend under flask-api directory.
- React App for Minesweeper frontend client under react-client directory.

### Flask API

The Minesweeper Flask API consists of the following endpoints:

- `GET /user/<username>`: Retrieve a user object by username with its corresponding games.
- `POST /user/<username>`: Add a new user by username.
- `POST /user/<username>/game`: Add a new game by passing on the request body the game attributes (rows, cols, bombs, board, cellsState, cellsClicked, minutes, seconds, millis, victory and endGame as mandatory fields and gameId as optional field).

To run the Minesweeper Flask Api locally, just install Python 3.7 or greater, then run the following command to install the packages:<br /><br />
`pip install -r ./flask-api/requirements.txt`<br /><br />
Then run the following command to start the app:<br /><br />
`python ./flask-api/app.py`

### React Client

The React client is developed by using materialize UI components and the minesweeper logic board on javascript divided on react components.

The React Components were the following:
- GameSettings: This component is in charge of the user and board settings, like the username, rows, columns and number of mines to use in a game. Also this component shows the table list of the previous games played.
- Map: This component is in charge to create all the cells of the board.
- Cell: This a single cell of the game board, this one detects if it is clicked or flagged and also is in charge to communicate if the game is lost or if it is a win.
- App: This is the main or root component of the react client, this one is in charge to orchestrate the game settings and board game interaction within the game, also it has the timer setup of the app.

To run the react client app locally, just install node js and then install the needed packages by going to the reacl-client directory with the following command:<br /><br />
`npm install`<br /><br />
Then run the following command to start the app:<br /><br />
`npm start`

### Database

For this game it was used SQLite to store the users and games played.

The Database tables are the following:

- User: This table store only the username of the games.
- Game: This table is related from many to one to User table (by user_id), and stores all the attributes of a game (rows, cols, bombs, board, cells_state, cells_clicked, minutes, seconds, millis, victory and end_game).

Currently when the Flask API is started, if there is no data.db file then it will create a new one with empty tables, but if it already exists then will take the existent one. Also the Flask API uses SQLAlchemy to map the tables on the backend model.

### Deployment

These apps (React Client and Flask API) currently are deployed on AWS services, the apps were deployed on the following manner:

- React Client: The react client compiled files are deployed on a public AWS S3 Bucket (http://minesweeperclient.s3-us-west-2.amazonaws.com/index.html)
- Flask API: The Flask API is deployed on an AWS EC2 instance with a public IP (http://35.167.175.177)

### How the development was approached

For this development the approach and the manner to work was the following:

- First it was tackled the react-client by making a simple game of 10 X 10 board, and checking how the game could be divided into react components (Map and Cell components).
- The second part was to create the generic game by adding the GameSettings component to add username and make available to select the number of rows, columns and mines of the game.
- Then it was tackled the backend part to create the Flask API by thinking to generate the tables by using SQLAlchemy library and SQLite, also it was in mind to create the API resources by using JSON HTTP REST.
- Then it was developed the integration of the Flask API to the react client by creating the services calls on react.
- Finally the game was manually tested and deployed on AWS.

Note: Even though the development was started on the client, I initially thought and designed how the backend REST resources and tables will look like before starting the app.