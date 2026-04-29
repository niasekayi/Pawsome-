# Project Reflection – Pawsome Volunteer Matching Platform

**Your Name:** Nia Greene 
**Course:** Cloud Web Development
**Date:** April 29, 2026

---

## What I Built

I built Pawsome as a volunteer matching platform that helps people find volunteer opportunities nearby. The project includes a frontend with a landing page, a volunteering page, and a gallery, plus a Flask backend that provides opportunity data and generates summaries for users.

Pawsome is for volunteers, animal lovers, and small nonprofit organizations that need help matching volunteers to opportunities. The problem it solves is making local volunteer work easier to discover by providing a searchable interface, volunteer listings, and quick descriptions for each role.

When a user visits the site, they can read about the platform, click to the volunteering page, browse opportunities, and use the app to learn more about each option. The backend also supports calls to external services for additional data, which makes the app feel more connected and responsive.

---

## Key Cloud Concepts Demonstrated

*Explain the cloud computing concepts your project uses. Be specific about how each appears in your project.*

| Concept | How It Appears in Pawsome |
|---|---|
| **Cloud Hosting** | The Flask backend is designed to run on cloud services like Azure App Service, so the app can be hosted online without managing a physical server. |
| **Storage as a Service** | Static assets such as images and CSS files are separated from the backend logic, which mirrors how cloud storage can keep data isolated from compute resources. |
| **API Integration** | The backend integrates external APIs for volunteer data, AI summaries, and logos; this shows how cloud apps often rely on other services to add functionality. |
| **Scalability** | By keeping the frontend and backend decoupled, Pawsome is easier to scale later, since each layer can grow independently if traffic increases. |
| **Separation of Concerns** | HTML/CSS/JS in the frontend are separate from the Flask routes and Python services, which is a standard cloud architecture pattern for maintainability. |

This project also shows how a web app can use cloud-style design even before deployment: the separation of frontend and backend, and the idea of calling external services instead of embedding all logic in one place.

---

## Challenges

Building Pawsome taught me how to handle multiple moving parts at once. One challenge was organizing the project structure so the backend, frontend, and services all made sense together. At first, I had routes and service logic mixed in the same file, and I solved it by moving API calls into dedicated service modules.

Another challenge was managing external API integration. The OpenAI-style summary generation needed clear request formatting, and I had to add error handling because the external API could return empty or unexpected data. I also discovered that logo fetching could fail when a URL was missing, so I added fallback logic to keep the app stable.

A third real challenge was matching users to volunteer opportunities by location. ZIP code matching exposed edge cases where nearby organizations were not in the same region, so I made sure to include clear filters and fallback text when no opportunity matched the exact area.

---

## What I Learned

This project helped me understand cloud-native patterns much better. I learned how to structure a web app with a separate frontend and backend, and why using APIs makes an application more flexible and maintainable.

If I started over, I would spend more time planning the data flow between the frontend and backend before writing code. That would help reduce the number of refactors and make the component structure cleaner from the beginning.

For the next version of Pawsome, I would add user accounts, a real volunteer database, and a map view so volunteers could see opportunities on a map. I would also connect the app to a real VolunteerMatch API or a similar service for live data.

This project connects to real-world cloud applications because many modern services use the same patterns: a browser-based frontend, a backend API, and external services for specialized features. Pawsome is a good example of how those elements work together in a simple volunteer matching app.

---

## References

- Flask Documentation: https://flask.palletsprojects.com
- Microsoft Azure App Service: https://azure.microsoft.com/en-us/products/app-service
- OpenAI API: https://platform.openai.com/docs
- VolunteerMatch (data inspiration): https://www.volunteermatch.org
