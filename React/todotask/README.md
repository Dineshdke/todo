1. The project is setup into with FastAPI folder pointing to backend and React Folder pointing to frontend.
2. Front end id deployed in Vercel and backend is deployed using Render.
3. If you want to deploy please follow the following steps:
        a. First deploy the frontend in any of the frontend hosting service, and paste the frontend url in the origins list present in FastAPI\main.py.
        b. Later, deploy the backend url in any of the web hosting platforms, get the url and update the baseURL variable present in the path React\todotask\api.js.
4.Restart the servers and it would work fine.