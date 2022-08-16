# Cyfair Computer Science Club's Main Website

![Frontpage Mockup Image](/mockups/img/home.png "Frontpage Mockup")

Ideal design of the front page, but subject to change based on future discussion.

## Outline

Frontend is programmed by Mufaro (except for Google OAuth integration), backend is handled by Caleb.

Frontend: NodeJS (Typescript/Express)
Backend: C#

Frontend Goals:
- X UI for accessing the website
- UI for editing website contents easily (for those with permissions)
- X Google OAuth login integration (to then interface with backend permission system)

Backend Goals:
- MongoDB storage for Google OAuth information, stored website data (Announcement posts, Competition Announcements, and Meeting Reminders, etc.) and other persistent data
- Google OAuth based permission system for managing users
- Frontend interaction endpoints

## OAuth integration

When a user is signed into the website through Google, the login information is stored into the sessionStorage as JSON data.

### false admin checks:

1. announcements.js:

- 61
- 73
-
