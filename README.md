# :waxing_crescent_moon: Moon Chef
Live site: https://moon-chef.netlify.app/

## :receipt:		About
Moon Chef is a web applicaiton thats tracks the performance and information of the top 100 cryptocurrencies the world. A user can create an account, which will grant them the ability to save coins to their favourites list (more commonly known as a watchlist). The coins that are added to the list will persist, meaning when the user logs back into their account, the same coins will still be in their list. This was made possible by Firebase on the back-end, which was also used for user authentication alongside the user database. A user can also view more information about a certain coin by clicking on the coin's icon or arrow to reveal an extended version of the coin card, containing more information such as charts and historical data. The user can also search for a specific coin by typing the name of their desired coin into the search bar. 

## :hammer: Built Using:
* [React](https://reactjs.org/) - Front-end library
* [React Dom](https://reactjs.org/docs/react-dom.html) - Page navigation
* [Axios](https://www.npmjs.com/package/axios) - Fetching API
* [SASS](https://sass-lang.com/) (Loosely following the BEM naming convention) - Styling
* [Firebase](https://firebase.google.com/) - Back-end database storage and user authentication
* [ChartJS](https://www.chartjs.org/) - Charts
* [TippyJS](https://atomiks.github.io/tippyjs/) - Customizable tool tips
* [React Icons](https://react-icons.github.io/react-icons/) - Icons
* [React Sparklines](https://www.npmjs.com/package/react-sparklines) - Sparkline chart
* [API](https://rapidapi.com/Coinranking/api/coinranking1/) - Provided coin data

## :star: Features
- [x] 100 Crytocurrencies listed
- [x] Pagination feature
- [x] Search for a specific coin (From both the listed cryptocurrencies and your saved ones)
- [x] Users can sign up and log in using their using email and password
- [x] User authenication with firebase
- [x] Users can add/remove coins from their favourites and the changes will persist
- [x] Chart with 24h/7d/30d/3m/1y/5y filter options
- [x] Mobile, tablet and desktop responsive UI

![image](https://user-images.githubusercontent.com/44949034/199572543-e9922436-1cc8-415f-96fd-ea20256d02dc.png)

## :rocket: Getting started
### Prerequisites
* NodeJS must be installed on your computer
* Git must be configured
* A package manager such as NPM or YARN must be installed on your computer

Clone the repository:
```git clone https://github.com/domstasiulionis/Crypto-Dashboard.git```

```
// Installing project dependencies
npm install or yarn install

// API
You will need use your own API key which you can obtain from the API website.

// Firebase
You will need to use your own firebase account for the user auth and database.

// It is recommended that you add your API key and and firebase keys in a .env file.
// Add .env to .gitignore for privacy reasons - which is what was done in this project.

// Start the project
npm start or yarn start

// Publish the project
yarn build or npm build
```
## :computer: Author
Project created by [@domstasiulionis](https://github.com/domstasiulionis)
