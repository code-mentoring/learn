# Contributing to Code Mentoring

We're so glad you're here! This document will outline how we work, who's involved,
and general information on how you can get started on this fun project.


## ⛑ Available roles:
- **Front-end:** Works on the `client` with React, CSS, etc
- **Back-end:** Works in the `api` with NestJS, Node.js, Express, databases, etc
- **Full-stack:** Works across both `client` and `api`
- **Designer:** Works in Figma/other tools to design new user stories, envision product features, etc


## 👨‍💼 Who's involved?
This is a running list of those who are actively contributing to this project.

### 🧢 Maintainers
> A 🧢 next to someones name means they are a maintainer. These people are considered
> the project's leaders and core contributers. Please treat them with the respect
> you would give your boss. They are here to help us 😀 and make the project grow
> smoothly. If they ask for something, please 🙏 listen to what they say carefully.
> All maintainers are approved through Code Mentoring's leadership team.

### The Team
| Name | Role | Slack handle | Weekly Availability | Joined |
|------|------|--------|---------------------|--------|
| 🧢 Tristan Matthias | Project Lead | `@Tristan Matthias` | 20 hours | Apr 2020 |
| 🧢 Shane Sheridan | Scrum Master | `@Shane Sheridan` | 6 hours | Apr 2020 |
| Folke Westergren | Front End | `@Folke` | 5-10 hours | Apr 2020 |
| Lee Yang |  backend  | `@Lee` | 5-10 hours | Apr 2020 |
| Kevin Gilbert | Backend Dev | `@Kevin` | 5-10 hours | Apr 2020 |


## 🔧 What can I work on?
We use Github to track our issues. Look for any issues labelled `help wanted`. If
there is nobody assigned, comment that you'd like to take it over, and a maintainer
will assign you.

You can view [all issues needing help here](https://github.com/code-mentoring/learn/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)


## 💬 Communication
We use our Slack community (`#project-cm` channel) for discussions on the project,
and Github projects for tracking issues.

We also have a **weekly standup call at 6pm EST** on Hangouts. Message one of the
maintainers for access to slack or to get a meeting invite.


## 🏃🏻‍♀️ Sprints
We do monthly sprints with weekly standups at 6pm EST on hangouts. This means
each month we deploy to master with all the PRs that were done that month.


## 🌳 Branches
We use the [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/) branching
strategy to maintain the project. **PLEASE FOLLOW THIS FORMAT**

- `master` Production branch. Limited access on who can deploy to this
- `develop` Main development branch. We merge `feature/*` PRs into this branch
once they're approved
- `feature/*` A feature branch aimed at addressing a SINGLE feature/fix. We try
to keep these as SMALL AS POSSIBLE so our PR reviews are not to challenging. If
a maintainer asks you to reduce your PR size, please do so.
- `release/vX.X.X` Used to release the sprints work into production.
