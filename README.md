<br />
<div align="center">

  <h3 align="center">Ephemera</h3>

  <p align="center">
    The message board to vent your frusterations and commiserate with peers!
    <br />
    <a href="https://github.com/Ephemera-Space"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Ephemera-Space/Ephemera/issues">Report Bug</a>
    ·
    <a href="https://github.com/Ephemera-Space/Ephemera/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
       <li>
      <a href="#basic-outline">Basic Outline</a>
      <ul>
        <li><a href="#frontend">Frontend</a></li>
        <li><a href="#backend">Backend</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

[Ephemera](https://ephemera-client.herokuapp.com/)

While there are more than a few messaging apps on the internet along with message boards, the vast majority of them are based around creating lasting networks and finding interesting and new ways to connect. While that is a beautiful thing, sometimes you just want somewhere to scream and vent your frusterations. Ephemera is that place.

Here's why:

- It is an anonymous message board that allows you unlimited access
- Avoid overly toxic issues with the swear filter
- Upvote your favorite rants and watch them climb the leaderboard!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][next.js]][next-url]
- [![React][react.js]][react-url]
- [![Firebase][firebase.js]][firebase-url]
- [![Node][node.js]][node-url]
- [![Express][express.js]][express-url]
- [![PostgreSQL][postgresql]][postgresql-url]
- ~~[![Render][render.com]][render-url]~~
- [![Heroku][heroku.com]][heroku-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

For this application, you will need to have PostgreSQL version 12 or later, along with Node version 16 or later.
To check your current version input the following command in your command terminal.
This is a full stack application with a package.json file in both the client, and server side.
For the App run locally, you will need to run a npm installation at both locations via the following command.

- node
  ```sh
  node -v
  ```

For PostgreSQL, it will be a 2 step process, first to see if you have it installed.

- Postgres Installation check

  ```sh
  For Windows
  psql -U postgres

  For Mac
  psql
  ```

  If Postgres is not installed you will recieve an error.
  Otherwise, input the following to check your current version.

- Postgres Version
  ```sh
  SELECT version();
  ```
  You will also need to create a [![Firebase][firebase.js]][firebase-url] account for the authentication process, if you do not have one already.
  ~~If you wish to deploy the App, we currently reccomend [![Render][render.com]][render-url] as it is the only free deployment platform on the market, but please be aware that it can be quite slow.~~
  We have moved our platform to [![Heroku][heroku.com]][heroku-url]. While hosting the entire app can be expensive, we found Heroku to be much easier to work with with better documentation and faster speeds.
  If cost is a sticking point, and free is a must, [![Render][render.com]][render-url] is an option.

### Installation

_Below you will find the basics on installation and set up._

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Client side installation
   ```sh
   open terminal at ./rage/client
   npm install
   ```
3. Server side (installation only)
   ```sh
   npm install
   ```
   OR
4. Server side (installation with migrations and seeds)
   ```sh
   npm run build
   ```
5. Configure the knexfile
   ```js
   Change Postgres_User, Postgres_Password, Postgres_DB accordingly
   ```
   We would typically reccomend creating a .env file to store that information if you plan on using this App in a more serious capacity. This should be done for Firebase and Heroku's API keys. Please keep in mind that this should be done first. Adding API keys to a location that is not gitignored **cannot** be "undone" even if the code base is edited.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Notes

Due to our current knexfile.js/knex.js setup on the server side, there is no way to dynamically swap between production and development versions.
This is currently controled via hardcoding a variable called **endpoint** that can be found in the files listed below. To run locally, swap to localhost:8080.

- ./rage/client/src/components/Account.js
- ./rage/client/src/components/App.js
- ./rage/client/src/components/Input.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Basic Outline

The following is a rough breakdown of the application.

### Frontend

#### Components

Full front end functionality listed here for react

    App → Account
    App → Input
    App → Canvas
    App → Sidebar → Settings
    App → Sidebar → Top10
    App → Sidebar → Feed

#### Canvas

Unless you have a solid understanding of Canvas and how it works, we do not reccomend changing any settings as there is a high likelyhood of catastrophic failure. **Edit at your own risk.**

Canvas requires helper functions located under modules > animateCanvas
This function has borrowed code that is sourced for word wrap
It operates using a constructor to build an object in an array formatted for the function to read. Once the function reads it will go to fade in status when added, and move to solid status once animation is complete for the fade in, once an excess of 10 strings are displayed on the screen the oldest string will be removed via fade out and removed from the array of displayed strings.

The strings are determined randomly from all items available on the db.
The helper function CanvasHook performs the draw function, it operates recursively.

Items are added to the canvas array : rantMessageToCanvasArray via a useEffect that recurses itself on a set timeout of 1 second, this will consistently keep the canvas updating and filtering through the messages on the db array items stored locally.

The canvas automatically prevents strings from getting too close to the side… currently set at 250px however if size limit for characters is increased this will need to be modified under animateCanvas. Font size, color, fontweight, font family, border (strokecolor) and width can all be adjusted in animateCanvas.

#### Settings

The settings tab can be found on the left hand side of the screen and resembles a cog.
Based on users swear filter (profanity) the system will get either unfiltered or filtered messages that go through a word filter api, this selection is saved on the DB for user log out.

As the current authentication process saves a users's unique ID in local storage, the logout button clears User ID from local storage and refreshes page.

Please also note that a user who is not signed in will not have access to the Settings tab in the sidebar.

### Backend

For a better understanding of the existing schema, please look at the migration files located at ./rage/server/db/migrations

#### Availible API calls

##### GET request

- Please note that many of the paths and file names relate to the original name of the app (rage). While the app has rebranded, none of the inner workings have changed.

- Retrieves all unfiltered(with swears) messages

```sh
http://localhost:8080/rage/unfiltered
```

- Retrieves all filtered(clean) messages

```sh
http://localhost:8080/rage/unfiltered
```

- Used for user validation/authentication upon first accessing the app. Returns user info if available, or an empty string if there is no matching user.

```sh
http://localhost:8080/validation?q=uid
```

##### POST request

- Adds a new user to the database. Returns all fields from the userlibrary.

```sh
http://localhost:8080/createUser
```

- Retrieves user information upon successful authentication.

```sh
http://localhost:8080/signInUser
```

- Inserts the new message into the database. Returns all messages from the db after updating.

```sh
http://localhost:8080/postMessage
```

##### PATCH request

- Allows for message upvote. Returns all mesages from the db after the likeCount is updated.

```sh
http://localhost:8080/upvote?id=messageid&fb_uid=uid&filtered=t
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

The usage for this resource is quite straightforward. This is just meant to be an App that can be used for those who need a safe place to vent their anger. With that in mind, this place was not made to attack anyone directly and releasing any personal information (even your own) is not acceptable.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Dynamic background with Canvas
- [x] Secure authentication via Firebase
- [x] Toggleable swear filter
- [x] Upvote features
- [x] Moved backend server/database to Heroku
- [ ] Ability to ban users who do not follow community guidelines
- [ ] Mobile support
- [ ] Multi-language Support
  - [ ] Japanese

See the [open issues](https://github.com/Ephemera-Space/Ephemera/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

- Robyn [@Moocau](https://github.com/Moocau)
- Takuya [@TrenchTemplar](https://github.com/TrenchTemplar)
- Ken [@kman-cc](https://github.com/kman-cc)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

It's impossible to add every single resource that helped to make this possible, but below you will find a few.

- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[firebase.js]: https://img.shields.io/badge/Firebase-yellow
[firebase-url]: https://firebase.google.com/
[node.js]: https://img.shields.io/badge/node.js-success
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/express-informational
[express-url]: https://expressjs.com/
[postgresql]: https://img.shields.io/badge/PostgreSQL-blueviolet
[postgresql-url]: https://www.postgresql.org/
[render.com]: https://img.shields.io/badge/Render-orange
[render-url]: https://render.com/
[heroku.com]: https://img.shields.io/badge/%E2%86%91_Deploy_via-Heroku-7056bf.svg?style=flat-square
[heroku-url]: https://www.heroku.com/
