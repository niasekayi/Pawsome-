# Project Reflection – Pawsome Volunteer Matching Platform

**Your Name:**
**Course:**
**Date:**

---

## What I Built

*Describe the project in your own words. What does it do? Who is it for? What problem does it solve?*

> Example prompts to answer:
> - What is Pawsome and what was my goal in building it?
> - What pages/features did I implement?
> - What does a user actually do when they visit the site?

---

## Key Cloud Concepts Demonstrated

*Explain the cloud computing concepts your project uses. Be specific about how each appears in your project.*

| Concept | How It Appears in Pawsome |
|---|---|
| **Cloud Hosting** | The Flask backend is deployed on Azure App Service, making the app accessible over the internet without managing a physical server |
| **Storage as a Service** | Azure Blob Storage holds static image assets, separating storage from compute |
| **API Integration** | The backend calls external APIs (OpenAI, Google Favicon) — a core pattern in cloud-native apps |
| **Scalability** | Azure App Service can scale horizontally to handle more users without code changes |
| **Separation of Concerns** | Frontend (HTML/CSS/JS) and backend (Flask API) are decoupled, a standard cloud architecture pattern |

*Add your own observations here...*

---

## Challenges

*Describe at least 2–3 real challenges you faced and how you solved them.*

> Prompts:
> - What didn't work the way you expected at first?
> - Were there any external API issues? (e.g., Clearbit Logo API was deprecated — how did we fix it?)
> - How did ZIP code matching work, and what edge case did you discover?
> - What was confusing about the project structure or deployment?

---

## What I Learned

*Reflect on your personal growth from this project.*

> Prompts:
> - What cloud concepts do you understand now that you didn't before?
> - What would you do differently if you started over?
> - What would the next version of Pawsome include? (e.g., real VolunteerMatch API, user accounts, map view)
> - How does this project connect to real-world cloud applications you've seen or used?

---

## References

- Flask Documentation: https://flask.palletsprojects.com
- Microsoft Azure App Service: https://azure.microsoft.com/en-us/products/app-service
- OpenAI API: https://platform.openai.com/docs
- VolunteerMatch (data inspiration): https://www.volunteermatch.org
