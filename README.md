# Project CM - Code Mentoring's Learning platform (The Duolingo of Coding)
### 🔗 [learn.codementoring.co](https://learn.codementoring.co)
> Welcome to Project CM 👋, we're glad you're here! This project was born from our
community over at [codementoring.co](https://codementoring.co). The goal of this
project is to bring free, fun education to anyone who wants to learn how to code.

- [Project CM - Code Mentoring's Learning platform](#project-cm---code-mentorings-learning-platform)
    - [🔗 learn.codementoring.co](#%f0%9f%94%97-learncodementoringco)
  - [❓Why this project exists](#%e2%9d%93why-this-project-exists)
  - [💻 What this project uses for technology](#%f0%9f%92%bb-what-this-project-uses-for-technology)
  - [🙋‍♀️ How you can get involved](#%f0%9f%99%8b%e2%80%8d%e2%99%80%ef%b8%8f-how-you-can-get-involved)
    - [💬 Communication](#%f0%9f%92%ac-communication)
    - [📞 Weekly standup](#%f0%9f%93%9e-weekly-standup)
  - [📦 Installation and Setup](#%f0%9f%93%a6-installation-and-setup)
  - [👏 Credits](#%f0%9f%91%8f-credits)


## ❓Why this project exists
We differ a little to other approaches and platforms with our unique focus on
storytelling. For us, stories are the bedrock of society and are how we've been
learning as humans since the dawn of time. In this project, all education, features,
new ideas and roadmaps have a focus on the story they tell. This is what makes
Code Mentoring, and this platform special. We think you'll like it too 😊.


## 💻 What this project uses for technology
- **[Lerna](https://github.com/lerna/lerna):** Project CM uses Lerna to manage
all the packages in the repo. Lerna is a great way of handling multiple code
bases in a single git repository.
- **[Typescript](https://www.typescriptlang.org/):** We love TS here at Code Mentoring.
We feel it provides the flexibility of JS with extra safety and control.
Perfect for large projects like this
- **[React](https://reactjs.org/):** A popular framework for building UIs that
needs no introduction. We use React for all our front-end projects.
- **[NestJS](https://nestjs.com/):** Nest is a Node.js/GraphQL platform for building
great APIs. It has great support for typescript too. We use this for all our APIs/backends.
- **[GraphQL](https://graphql.org/):** GQL is a very innovative alternative to the
standard REST API you might be used to. We use GQL as the communication layer between
our front-end and back-end. (NestJS for API, and Apollo for React)
- **[Apollo](https://www.apollographql.com/):** Apollo is a great framework that
NestJS uses to communicate with the front-end. We use [Apollo Client](https://www.apollographql.com/docs/react/) in React to
talk to the API.
- **[Postgres Database](https://www.postgresql.org/):** A very powerful, open source
database used by the industry for projects of all sizes.


## 🙋‍♀️ How you can get involved
Code Mentoring is an open community for all types and levels of develoeprs,
designers, hackers and tinkerers. If you want to get involved, or see something
you want to build (or even a bug fix), head over to our [Contributing](CONTRIBUTING.md)
document for more information.

> Please read our branching strategy in [Contributing](CONTRIBUTING.md).
>
> This is important if you want to contribute!

### 💬 Communication
We use our Slack community (`#project-cm` channel) for discussions on the project,
and Github projects for tracking issues.

### 📞 Weekly standup
We also have a **weekly standup call at 6pm EST** on Hangouts. Message one of the
maintainers for access to slack or to get a meeting invite.

---

## 📦 Installation and Setup
1. **Install Node.js.** Check the website for information on how to install
2. **Install [Yarn](https://yarnpkg.com/)** Check the website for information on how to install
3. **Clone the project.** Git clone the project to somewhere you want to work on
your local machine
4. **Install Postgres database.** This will be needed to run the project locally
5. **Setup database**
   1. Create a user on your new Postgres database
   2. Create a database called `code_mentoring_learning` in Postgres
   3. Create your local development settings file under: `packages/api/config/development.yml`
   4. Add the following to that file:
   ```yml
   db:
     username: USER YOU JUST CREATED IN POSTGRESS
     password: PASSWORD YOU USED
    ```


6. **Install dependencies**: Inside the *__root__* of the project, run `yarn` and wait for install
7. Setup is complete 🎉!

## 🗺 Getting around / project structure
Project CM is divided into 3 (currently) main packages.
- [**`api`**](packages/api/README.md): The NestJS API package that powers all our data ([api.codementoring.co](https://api.codementoring.co))
- [**`client`**](packages/client/README.md): The React package that provides the UI/front-end for the project ([learn.codementoring.co](https://learn.codementoring.co))
- [**`ui`**](packages/client/README.md): A React project for all the UI components to live. (Will eventually be reused in the **[WWW/marketing site](https://github.com/code-mentoring/www)**)


## 🏃🏿‍♂️ Running the project

### API:
```
cd packages/api;
yarn dev
```
You can then open [http://localhost:4000/graphql](https://localhost:4000/graphql)
to test the API

### Client:
```
cd packages/client;
yarn dev
```
Once the API is running, open [http://localhost:8080](https://localhost:8080) to
load the front-end.


---

## 👏 Credits
This project is built and maintained by the community of [Code Mentoring](https://codementoring.co).

*Built by the people, for the people*
