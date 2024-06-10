# travel-planner
I got an assigment for the swedish airline company S.A.S. For the position. "DevEx Senior Engineer Evaluation".  Instructions given are stated bellow. 
You can download the files .Then. "npm run start". 

# Explanation:

The web application is designed to work with Auth0 for user authentication, although it can also function without requiring login. Upon logging in, users gain access to a profile view and personalized user information display.

The primary feature of the application is its ability to search for flights based on session, time, duration, and budget constraints. The form triggers an API call to the Amadeus free system (get-offers-api). Currently, the response from this API call is printed in the console, with a simple redirection to an example card view for flight offers. This decision was made to keep the implementation straightforward due to time constraints.

# Limitations and Future Steps:

I opted not to utilize Microsoft Azure for the backend due to exceeding the free tier limit on my personal account across various projects. Instead, I focused solely on developing a frontend using React and TypeScript. However, I acknowledge the importance of incorporating a backend Node solution for scalability purposes. Unlike using Redux as a frontend workaround, a backend architecture offloads data processing and heavy operations from the client, thereby reducing client-side complexity and facilitating easier horizontal scaling.

Additionally, in future iterations, I intend to implement Azure Active Directory (AD) authentication, as it offers more control over different types of roles and is easier to manage.

In my resume, I envision the application featuring a backend hosted on Azure, integrated with Azure AD directory authentication. I plan to include an architectural diagram illustrating how data will be managed, along with a clear outline of how user information and search queries will be stored. While these enhancements are feasible, the time investment required to implement them exceeds my current availability.


# The instruction of the assigment were . 
# _______________________________________________________________________________________________
# DevEx Senior Engineer Evaluation

Scenario
My name is Emma and I live in Stockholm. I am planning a vacation this summer. I do not have any specific place in mind, but I would love to unwind at a beach in some warm country. 
When I check the vacation options on the web, I get overwhelmed, as there are so many options, and I don’t know which ones to go with. I am planning to spend 1 week, and the below factors are important to me:
Comfort and convenience
A warm country and a nice beach Location
Cost is not very important but at the same time I don’t want to break my bank
So, could you help me build a custom itinerary for my vacation at a perfect location along with the flight options?

# Problem Statement:
Create a web-based Travel Planner which takes in the traveller’s preference and provides an optimal travel itinerary which includes :
Several destination choices and a summary of why the destination is the optimal choice for the traveller
Flight options to and from the destination along with suggestons on accomodation and activities

# Requirements:
(Mandatory)

Frontend: A simple UI that allows the traveller to login, accepts the search criteria and displays the results.

Backend: A server-side component that performs the business logic based on the search criteria and returns the results. You can use dummy data hardcoded in your code, but preference will be given if you are able to use open-source APIs to get the mock data

Deployment: The website should be publicly accessible and deployed on any Azure service (i.e., Azure WebApp, Azure Kubernetes Services etc.,). Use GitHub Actions to automate the build and deploy process.

Infrastructure: The infrastructure required to run the application should be created using Terraform which should also be part of the GitHub repo.

(Bonus)

Along with the mandatory requirements, we encourage you to improve the Travel Planner with as much creative use of the latest DevOps best practices, adding new features and improving on the mandatory features etc., 

Some ideas which will add weightage to your solution are:

Use any modern UI Frameworks such as (React, Angular etc.,)
Ensure proper handling of user authentication, including password hashing for security
Responsive Design: Optimize the interface for various devices (desktop, tablet, mobile)
Implement microservices architecture (i.e.., a flight search api, a hotel search api etc.,)
Use a mono repo configuration for all the different micro services
Use a PaaS database to store the info and be able to fetch the results on the traveler's next login
Have the ability to register new users
Use proper error handling and validation techniques, both on the frontend and backend.

# Goal: 

This exercise is to evaluate several things, but the focus is going to be Coding + Cloud + Best Practices in the chosen Technology.  
There are no right or wrong answers, just solutions which might be more / less elegant.

Before You Start:
This test involves a series of tasks. There is no time limit for the test but please try to complete it earliest so we can proceed with the next steps in the interview process.
Use your Azure subscription or create subscription using free tier.
Use your GitHub account to create repo and store the code for the exercises. Share the the GitHub repo URL and the publicly accessible URL of the deployed site.
Organize your code into separate modules or components for better maintainability.
Please maintain git code commit history.

# Notes:
Mention any pre-requisites in the README.md at the root of your repo. 
The evaluator will proceed by going over the steps mentioned in the README.
Demonstrate the complete workflow & execution in the next Face to Face discussion.
