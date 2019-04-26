# hackadayApi

## Introduction
This project provides a view for [hackaday.io](https://hackaday.io) projects and their users. The projects makes use of server side rendering without using ReactJs. Implemented caching inorder to navigate through pages faster.

Provides 10 projects per page, has a read more on each projects if anyone wants to know more about the project. 

All data is fetched from the [hackaday API](https://dev.hackaday.io/doc/api). The project itself only maintains local cache and no database as of now.

It also provides the user with recommendations about projects and users, Recommendations are unique to each browsing session. Recommendations are based tags for users and projects, shows projects similar to projects where users clicks on read more.

Used a singleton architecture for the project.

Created my own component system to facilitate server side rendering. All operations happen on the server, only dynamic content is generated on the front end.

## Requirements
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/)
* [NodeJs](https://nodejs.org/en/)

## Technologies & Languages Used
* NodeJS
* Git
* SASS
* Vanilla Javascript
* Express
* EJS

## How to Run the Application?
* Clone or download the project
* Enter the project directory
* Open your cmd
* Type `yarn` or `npm install`
* Go to the `index_help.js` file under `components/Credentials`
* Enter your unique api key from [hackaday.io](https://hackaday.io)
* Change the file from `index_help.js` to `index.js`
* Type `yarn start` or `npm start`
* Go to `localhost:3000`
* Enjoy browsing and hack away.

## Detailed Description On The Project

### Components

#### Credentials
Stores the api key for hackaday.io

#### DataAccess
Has helper functions to maintain the data of the project. Each of these functions have their own state of data which they maintain

##### MinHeap
It is used to maintain a min heap to store the top three project tags and user tags. The tags have a score attached to them which is calculted using probability.

##### ProjectData
It has helper functions to get project data. Used to get a page of projects and also single projects.

##### Recommender
It containts helper funtions to maintain recommendation data. It scores each tag based on the number of times the user has visited similar projects or users having that tag.

##### UserData
Similar to project data but has helper functions for users and not projects.

#### Layouts
It has several helper functions to generate the layout. Takes care of the entire layout. has modular functions to create the html template, head section, body section etc. Each function is a pure function here. Is serves as the base for server side rendering. It also has attributes which are simple functions to return the various html tags like the anchor tag `<a>`, pararaph tag `<p>`, header tag `<h1>` etc.

#### Sass
Contains all the styling for the project.

### Public
Contains the javascript files for dynamic content loading. Loads the user data dn tooltips dynamically after the page loads. It also changes the pages dynamically using hash routes. Generates recommendations dynamically to.

### Routes

#### Index
Manages all the data for `/`, `/projects/:id`, `/getRecommendation`, `/getPage`. Deals with mostly project data. It creates the html for the page on the server and sends a `text/html` response back to the client. Puts all the componenets together.

#### Users
Manages the user data for `/users`. Fetches the user data and sends it back as a `json` response back to the client.
