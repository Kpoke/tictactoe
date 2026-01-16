[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">TICTACTOE</h3>

  <p align="center">
    Play tictactoe against other players from the world online!
    <br />
    <br />
    <a href="https://kpoke.github.io/tictactoe/">View</a>
    ·
    <a href="https://github.com/Kpoke/tic-tac-toe-backend">Backend</a>
    ·
    <a href="https://github.com/Kpoke/tictactoe/issues">Report Bug</a>
    ·
    <a href="https://github.com/Kpoke/tictactoe/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)  
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot1]]()
[![Product Name Screen Shot][product-screenshot2]]()
[![Product Name Screen Shot][product-screenshot3]]()


### Built With

* [React](https://reactjs.org/) 18.2.0
* [TypeScript](https://www.typescriptlang.org/) 4.9.5
* [Redux](https://redux.js.org/) 5.0.1
* [Socket.io](https://socket.io/) 4.8.1
* [Axios](https://axios-http.com/) 1.7.7


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Installation
 
```sh
$ git clone https://github.com/Kpoke/tictactoe.git
$ npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_WS_BASE_URL=https://playtttoe.herokuapp.com
REACT_APP_API_BASE_URL=https://playtttoe.herokuapp.com
```

For local development, you can modify these URLs to point to your local backend.

### Running the Application

```sh
$ npm start

# Load the site at localhost:3000/
```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run format` - Formats code using Prettier
- `npm run format:check` - Checks code formatting without making changes
- `npm run deploy` - Builds and deploys to GitHub Pages

### Code Quality

This project includes:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Jest** and **React Testing Library** for testing
- **GitHub Actions** for CI/CD
- **Error Boundary** for error handling
- **Accessibility** features (ARIA labels, keyboard navigation)


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Kpoke/tictactoe/issues) for a list of proposed features (and known issues).

## Features

- 🎮 **Multiple Game Modes**
  - Play against computer (AI)
  - Local multiplayer (pass and play)
  - Online multiplayer with real-time updates

- 🏆 **Leaderboard System**
  - Track top 100 players
  - Real-time leaderboard updates
  - Points system for online wins

- ⚡ **Real-time Gameplay**
  - WebSocket-based multiplayer
  - Live game state synchronization
  - Timer-based gameplay

- ♿ **Accessibility**
  - ARIA labels and roles
  - Keyboard navigation support
  - Screen reader friendly

- 🛡️ **Error Handling**
  - Error Boundary component
  - Graceful error recovery
  - User-friendly error messages

- 🧪 **Testing**
  - Unit tests for game logic
  - Component tests
  - Redux reducer tests

- 🚀 **CI/CD**
  - Automated testing on pull requests
  - Automated deployment to GitHub Pages
  - Security audits



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Kpoke - [@Danielholodja](twitter.com/Danielholodja)

Project Link: [https://github.com/Kpoke/tictactoe](https://github.com/Kpoke/tictactoe)

Project Backend Link: [https://github.com/Kpoke/tic-tac-toe-backend](https://github.com/Kpoke/tic-tac-toe-backend)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Toluwalemi](https://github.com/Toluwalemi)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Kpoke/tictactoe.svg?style=flat-square
[contributors-url]: https://github.com/Kpoke/tictactoe/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Kpoke/tictactoe.svg?style=flat-square
[forks-url]: https://github.com/Kpoke/tictactoe/network/members
[stars-shield]: https://img.shields.io/github/stars/Kpoke/tictactoe.svg?style=flat-square
[stars-url]: https://github.com/Kpoke/tictactoe/stargazers
[issues-shield]: https://img.shields.io/github/issues/Kpoke/tictactoe.svg?style=flat-square
[issues-url]: https://github.com/Kpoke/tictactoe/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/kpoke
[product-screenshot1]: src/assets/1.PNG
[product-screenshot2]: src/assets/2.PNG
[product-screenshot3]: src/assets/3.PNG
