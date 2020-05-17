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

| Name                | Role                      | Slack handle        | Github                                                 | Weekly Availability | Joined   |
| ------------------- | ------------------------- | ------------------- | ------------------------------------------------------ | ------------------- | -------- |
| 🧢 Tristan Matthias | Project Lead              | `@Tristan Matthias` | [@tristanMatthias](https://github.com/tristanMatthias) | 20 hours            | Apr 2020 |
| 🧢 Shane Sheridan   | Scrum Master              | `@Shane Sheridan`   | [@shane215](https://github.com/shane215)               | 6 hours             | Apr 2020 |
| 🧢 Quim Granados    | Full-stack                | `@Quim Granados`    | [@quimgv](https://github.com/quimgv)                   | 10-20 hours         | Apr 2020 |
| 🧢 Rajat Bansal     | WWW Lead                  | `@Rajat Bansal`     | [@rjtbansal](https://github.com/rjtbansal)             | 15-20 hours         | Apr 2020 |
| Frank Kim           | Documentation / Front-end | `@Frank Kim`        | [@heyfranksmile](https://github.com/heyfranksmile)     | 10 hours            | Apr 2020 |
| Frankie Law         | Full stack                | `@Frankie`          | [@FrankieLaw](https://github.com/FrankieLaw)           | 5-10 hours          | Apr 2020 |
| Suzy Nakayama       | Full-stack                | `@Suzy Nakayama`    | [@suzynakayama](https://github.com/suzynakayama)       | 10 hours            | Apr 2020 |
| Tomoya Kuroda       | Full-stack                | `@Tomoya`           | [@tomoyakuroda](https://github.com/tomoyakuroda)       | 10 hours            | Apr 2020 |
| Ellie Xiang         | Full-stack                | `@Ellie`.           | [@Ellie-2020](https://github.com/Ellie-2020)           | 8+ hours            | Apr 2020 |
| Folke Westergren    | Front-end                 | `@Folke`            | [@f-westergren](https://github.com/f-westergren)       | 5-10 hours          | Apr 2020 |
| Weiwei Zhang        | Front-end                 | `@Weiwei Zhang`     | [@wzhang66](https://github.com/wzhang66)               | 5-10 hours          | Apr 2020 |
| Ahmed Alhassan      | Front-end                 | `@Ahmed Alhassan`   | [@ahmedfaaid](https://github.com/ahmedfaaid)           | 8 hours             | Apr 2020 |
| Lee Yang            | Back-end                  | `@Lee`              | [@LeeYang2019](https://github.com/LeeYang2019)         | 5-10 hours          | Apr 2020 |
| Kevin Gilbert       | Back-end                  | `@Kevin`            | [@NoSoEpicCoder](https://github.com/NoSoEpicCoder)     | 5-10 hours          | Apr 2020 |
| Rayser Castrillo    | Back-end                  | `@rayser`           | [@raysercast1](https://github.com/raysercast1)         | 5 - 10 hours        | Apr 2020 |
| Lan Phan            | Testing & Front-end       | `@Lan Phan`         | [@lanphantastic](https://github.com/lanphantastic)     | 3 - 6 hours         | Apr 2020 |
| Jeff Norman         | Front-end & Design        | `@Jeff`             | [@crizzpy](https://github.com/crizzpy)                 | 10 hours            | May 2020 |
| Marc Tessier        | Design                    | `@Marc Tessier`     | [@mtess88](https://github.com/mtess88)                 | 15 hours            | May 2020 |
| Andrea Morreale     | Design                    | `@Andre M`          | [@akimdesign](https://github.com.akimdesign)           | 20 hours            | May 2020 |

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

## Commit Messages

### Message Structure

A commit message consists of three distinct parts separated by a blank line: the title, an **optional** body and an **optional** footer but we'll be focusing only on the subject. The layout looks like this:

`type(scope?): subject`

The title consists of the type of the message and subject.

### :exclamation: Command Line

This is how you commit your message with all three parts with a blank line:

`git commit -m "type(scope)?: subject"

### The Type
The type is contained within the title and can be one of these types:

- **feat**: a new feature
- **fix**: a bug fix
- **docs**: changes to documentation
- **style**: formatting, missing semicolons, etc; no code change
- **refactor**: refactoring production code
- **test**: adding tests, refactoring test; no production code change
- **chore**: updating build tasks, package manager configs, etc; no production code change

### The Scope
The scope describes the category of your change and the commonly used are of the following:
- build,
- chore,
- ci,
- docs,
- feat,
- fix,
- perf,
- refactor,
- revert,
- style,
- test

NOTE: These strict type and scope can be found in **commitlint.config.js**

### The Subject

Subjects should be no greater than 50 characters, does not begin with a capital letter and do not end with a period.
Use an imperative tone to describe what a commit does, rather than what it did. For example, use change; not changed or changes.

## PRs

As per git flow, all PRs should be on branches with the names `feature/name-of-feature`.
**They should be requested to merge into the `develop` branch, NOT THE `master` branch.**

### Approaches to writing a PR ###

Include the purpose of this Pull Request. For example:

`This is a spike to explore…`

`This simplifies the display of…`

`This fixes handling of…`

Consider providing an overview of why the work is taking place (with any relevant links); don’t assume familiarity with the history.

Be explicit about what feedback you want, a quick pair of :eyes: on the code, discussion on the technical approach, critique on design or a review of copy.

### Feature breaking

Whenever it’s possible, break pull requests into smaller ones.

Let’s say that you need to create a subscribe feature on your app. It's just a form that accepts an email address and saves it. Without knowing how your app works, I can already break it in 8 pull requests.

- Create a model to save emails
- Create a route to receive requests
- Create a controller
- Create a service to save it in the database (business logic)
- Create a policy to handle access control
- Create a subscribe component (frontend)
- Create a button to call the subscribe component
- Add the subscribe button in the interface

### Title

Make a self-explanatory title describing what the pull request does. (Issue reference can be put in the subject. EG: ci: fixes #44)

### Description

Detail with what was changed, why it was changed, and how it was changed.
If necessary, add some screenshots or a GIF or video of you using the feature.

When a PR is ready, please make sure to request a review from a 🧢 maintainer.
Once the maintainer has approved your PR, it will be merged for you into `develop`.

## Offering feedback ##

- Familiarize yourself with the context of the issue, and reasons why this Pull Request exists.
- If you disagree strongly, consider giving it a few minutes before responding; think before you react.
- Ask, don’t tell. (“What do you think about trying…?” rather than “Don’t do…”)
- Explain your reasons why code should be changed. (Not in line with the style guide? A personal preference?)
- Offer ways to simplify or improve code.
- Avoid using derogatory terms, like “stupid”, when referring to the work someone has produced.
- Be humble. (“I’m not sure, let’s try…”)
- Avoid hyperbole. (“NEVER do…”)
- Aim to develop professional skills, group knowledge and product quality, through group critique.
- Be aware of negative bias with online communication. (If content is neutral, we assume the tone is negative.) Can you use positive language as opposed to neutral?
- Use emoji to clarify tone. Compare “:sparkles: :sparkles: Looks good :+1: :sparkles: :sparkles:” to “Looks good.”

## Responding to feedback ##

- Consider leading with an expression of appreciation, especially when feedback has been mixed.
- Ask for clarification. (“I don’t understand, can you clarify?”)
- Offer clarification, explain the decisions you made to reach a solution in question.
- Try to respond to every comment.
- Link to any follow up commits or Pull Requests. (“Good call! Done in 1682851”)
- If there is growing confusion or debate, ask yourself if the written word is still the best form of communication. Talk (virtually) face-to-face, then mutually consider posting a follow-up to summarize any offline discussion (useful for others who are following along, now or later).
- These guidelines were inspired partly by Thoughtbot’s [code review](https://github.com/thoughtbot/guides/tree/master/code-review) guide.

Congratulations 🎉! #alwaysbeshipping ⛵️
