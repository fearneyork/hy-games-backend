

# README: hy-games

  

## Hosted version of hy-games
Here's the [link](https://hy-games.herokuapp.com/api/) to my hosted database, that stores information about board games!
It's hosted on Heroku so if it takes a little while on your first request, it's probably being woken up from a deep slumber 😴

---

## Project Summary
The project was started as a pair-programming exercise for setting up the seeding to the database and then once we had created and tested our first endpoint, we split to be on solo sprints.

### Built with
 - [Express](https://expressjs.com/)
 - [Postgres](https://www.postgresql.org/docs/) and [pg-format](https://www.npmjs.com/package/pg-format)
 - [JEST](https://jestjs.io/docs/getting-started)

 ---
 
## Getting started
### Prerequisites
 - node (min version v15.13.0) and npm (min version 7.17.0)
   -  either download by this [link](https://nodejs.org/en/download/)
   -  or install using homebrew 
 `brew install node`
   -  Make sure you have them installed by running the following commands
 `node -v` and `npm -v`
 -   Install Postgres App (min psql version 13.2, server 13.3)
	 - download by this [link](https://postgresapp.com/)
	 -   Open the app (little blue elephant) and select initialise/start

### Installation
1. Fork this repo
2. Clone your forked repo
3. Install NPM packages
`npm install`
4. Create your environment variables
  -  Create two root level .env files for both the test and development databases. The files should follow the format of;
	  - `.env.test`
	  - `.env.development`
The git ignore is set to ignore the commitment of any files that start with '.env.' to protect any sensitive data.
Then follow the .env-example file to set your PGDATABASE name using `PGDATABASE=your_database_name_here`, for both the development and test databases, being 'nc_games' and 'nc_games_test' respectively.

If you want to change the name of the databases you'll have to name them the same between your .env files and the setup.sql files.

5. Seed the local database
  -  Make sure you have Postgres running, and run the terminal commands;
	  -  `npm run setup-dbs`
	  -  `npm run seed`

### Running tests
- Run all tests
	 - `npm run test`
	 - This will run the script which tests both the 'app.test.js' and the 'utils.jest.js' files by default.

- Run single test file
	- `npm run test app`
	- `npm run test utils`
	- If you want to test a single test file you can append the command with the file name or just the first word. for example to only test the app endpoints;

No matter if you're testing the util functions or the app functions, the database is set to re-seed before each test and then once all tests are completed, end the connection to the database, so no worries on re-seeding before running the test files each time.

By default the tests will run with JEST each time you save. In order to run only once, you can change the 'test' script in the 'package.json' file to omit the '--watch'.
You can exit the JEST test runner with `Ctrl C`.
 
---
## Available endpoints
 - GET /api/
	 - Response: 
```json
{
  "message": "all ok"
}
```
 - GET /api/categories
	 - Response: an array of objects in the following format
```json
{
  "categories": [
    {
      "slug": "euro game",
      "description": "Abstact games that involve little luck"
    },
  ]
}
```
 - GET /api/reviews
	 - Response: an array of objects in the following format
```json
{
  "reviews": [
    {
      "review_id": 7,
      "title": "Mollit elit qui incididunt veniam occaecat cupidatat",
      "review_body": "Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.",
      "designer": "Avery Wunzboogerz",
      "review_img_url": "https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "votes": 9,
      "category": "social deduction",
      "owner": "mallionaire",
      "created_at": "2021-01-25T11:16:54.963Z",
      "comment_count": "0"
    },
  ]
}
```
 - GET /api/reviews/:review_id
	 - *nb. :review_id is a placeholder for any review id, e.g. 2*
 	 - Response:
```json
{
  "review": {
    "review_id": 2,
    "title": "Jenga",
    "review_body": "Fiddly fun for all the family",
    "designer": "Leslie Scott",
    "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
    "votes": 5,
    "category": "dexterity",
    "owner": "philippaclaire9",
    "created_at": "2021-01-18T10:01:41.251Z",
    "comment_count": "3"
  }
}
```
 - GET /api/reviews/:review_id/comments
	 - Response: an array of objects in the following format
```json
{
  "comment": [
    {
      "comment_id": 1,
      "author": "bainesface",
      "review_id": 2,
      "votes": 16,
      "created_at": "2017-11-22T12:43:33.389Z",
      "body": "I loved this game too!"
    },
  ]
}
```

 - POST /api/reviews/:review_id/comments
	- Request:
```json
{
	"body":  "I'm just a lowly villager",
	"created_by":  "mallionaire"
}
```

- Responds with the created comment

```json
{
  "comment": [
    {
      "comment_id": 7,
      "author": "mallionaire",
      "review_id": 2,
      "votes": 0,
      "created_at": "2021-06-26T11:52:28.770Z",
      "body": "I'm just a lowly villager"
    }
  ]
}
```

- PATCH /api/reviews/:review_id
	- Request:
```json
{
	"inc_votes":  1
}
```

- Responds with the patched review

```json
{
  "review": {
    "review_id": 2,
    "title": "Jenga",
    "review_body": "Fiddly fun for all the family",
    "designer": "Leslie Scott",
    "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
    "votes": 6,
    "category": "dexterity",
    "owner": "philippaclaire9",
    "created_at": "2021-01-18T10:01:41.251Z"
  }
}
```
