# InovaTech - Idea Collaboration Website

InovaTech is a website where users can post their ideas or visions and collaborate with others who are interested in their ideas. It provides a platform for users to connect, discuss, and work together to bring innovative ideas to life.

## Overview

InovaTech aims to foster a community of creative individuals who can share their ideas and find like-minded collaborators. The website allows users to post their ideas, receive feedback through comments, and connect with other users who are interested in their ideas.

## Features

- User Authentication: Users can sign up, log in, and log out to access the website's features.
- Publish Ideas: Logged-in users can publish their ideas by providing a title, description, and optional media file.
- Browse Ideas: Users can explore all published ideas on the website.
- View Idea Details: Users can view detailed information about a specific idea, including its title, description, and associated media.
- Update Ideas: Authors of ideas can update their published ideas, modifying the title, description, or media file.
- Delete Ideas: Authors of ideas can delete their published ideas from the website.
- User Profiles: Users have profiles that display their basic information, such as name, email, phone, and LinkedIn profile.
- Add Comments: Users can comment on published ideas, sharing their thoughts and feedback.
- View Comments: Users can see all comments associated with a specific idea.
- Filter Ideas by User: Users can filter ideas based on the author, viewing ideas published by a specific user.

## Project Screenshots
[https://drive.google.com/file/d/1Ef109OGOewovqX4J3Z6RjLmfnVuGDCfG/view?usp=sharing](https://drive.google.com/drive/folders/1x-7FRm7E8JUdpM9bmnF_vyIUd4MmDsTp?usp=sharing)

## Website Demonstration video
https://youtu.be/E-pqZnTPlzw

## Website URL
https://inovatech12.netlify.app/

## API URL
https://inovatech-riosumit.vercel.app/api/

## API Endpoints

The following API endpoints are available:

### User Login
URL: `/login`<br>
Method: POST<br>
Description: Authenticates the user based on email and password.<br>
Request Body: JSON object with email and password fields.<br>
Response: JSON object with user details if authentication is successful, or an error message if authentication fails.<br>

### User Sign Up
URL: `/signup`<br>
Method: POST<br>
Description: Registers a new user with the provided details.<br>
Request Body: JSON object with user details (name, email, password, etc.).<br>
Response: JSON object with the registered user details if successful, or an error message if registration fails.<br>

### Check User Login Status
URL: `/islogin`<br>
Method: GET<br>
Description: Checks if the user is currently logged in.<br>
Response: JSON object indicating whether the user is logged in or not.<br>

### Publish Idea
URL: `/publish`<br>
Method: POST<br>
Description: Adds a new idea to the system.<br>
Request Body: Form data or multipart data containing the idea details (title, description, etc.) and media file (if applicable).<br>
Response: JSON object indicating whether the idea was added successfully or not.<br>

### Get All Ideas
URL: `/ideas`<br>
Method: GET<br>
Description: Retrieves all published ideas.<br>
Response: JSON array containing the details of all published ideas.<br>

### Get Idea by ID
URL: `/idea/<pk>`<br>
Method: GET<br>
Description: Retrieves a specific idea by its ID.<br>
Response: JSON object containing the details of the requested idea.<br>

### Delete Idea by ID
URL: `/delete/<pk>`<br>
Method: GET<br>
Description: Deletes a specific idea by its ID.<br>
Response: JSON object indicating whether the idea was deleted successfully or not.<br>

### Update Idea
URL: `/update`<br>
Method: POST<br>
Description: Updates an existing idea with new details.<br>
Request Body: Form data or multipart data containing the updated idea details (title, description, etc.) and media file (if applicable).<br>
Response: JSON object indicating whether the idea was updated successfully or not.<br>

### Get User by ID
URL: `/user/<pk>`<br>
Method: GET<br>
Description: Retrieves a specific user by their ID.<br>
Response: JSON object containing the details of the requested user.<br>

### Add Comment
URL: `/comment`<br>
Method: POST<br>
Description: Adds a new comment to an idea.<br>
Request Body: JSON object with comment details (idea ID, user ID, comment text, etc.).<br>
Response: JSON object indicating whether the comment was added successfully or not.<br>

### Get Comments for Idea
URL: `/comment/<pk>`<br>
Method: GET<br>
Description: Retrieves all comments associated with a specific idea.<br>
Response: JSON array containing the details of all comments for the requested idea.<br>

### Get Ideas by User
URL: `/ideas/<pk>`<br>
Method: GET<br>
Description: Retrieves all ideas published by a specific user.<br>
Response: JSON array containing the details of all ideas published by the requested user.<br>

## Documentation
https://docs.google.com/document/d/1mA2ozYh5U90ANSRvSdkfHncB_UED9Va1Ywzvm88EdJ8/edit?usp=sharing

## Getting Started

To get started with InovaTech, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Riosumit/inovatech.git

2. Navigate to the project directory:
   ```bash
   cd inovatech

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt

4. Run the development server:
   ```bash
   python manage.py runserver
   
5. Access the api's locally at http://localhost:8000/
   
6. Navigate to the react app directory
   ```bash
   cd interface

7. Install the required dependencies:
   ```bash
   npm install

8. Run the development server:
   ```bash
   npm start

9. Access the website locally at http://localhost:3000/

## Contributing
Contributions to ANANTA are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request detailing your changes.

## Contact
For any inquiries or feedback, please contact Sumit Kumar at rajsumit22032003@gmail.com.

## Acknowledgements
We would like to acknowledge all the contributors to ANANTA and express our gratitude to the individuals, organizations, and resources that have supported its development.
