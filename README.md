# CRM API Documentation

This document provides an overview of the CRM (Customer Relationship Management) API endpoints, their functionalities, and instructions on how to test them using Postman.

## Endpoints

### 1. Get CRM Settings

- **URL:** `/crm/settings`
- **Method:** GET
- **Description:** Retrieves the current CRM settings, including logo and header images.
- **Response:**
    - Status Code: 200 OK
    - Body: JSON object containing CRM settings, including logo and header images.
    - Example Response:
      ```json
      {
          "instagramUrl": "https://www.instagram.com/dr_wafazaiem/",
          "logoImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
          "headerImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
          "address": "Centre Urbain Nord, Tunis, Résidence New Tower, 2eme Etage, Cabinet B2-4",
          "email": "dr-wafazaiem@gmail.com",
          "phoneNumber": "+216 53 44 65 14",
          "color": "#E80675"
      }
      ```
- **Error Responses:**
    - Status Code: 404 Not Found
        - Body: JSON object with error message (`{ "error": "CRM settings not found." }`)
    - Status Code: 500 Internal Server Error
        - Body: JSON object with error message (`{ "error": "Internal server error" }`)

### 2. Update CRM Settings

- **URL:** `/crm/updateSettings`
- **Method:** POST
- **Description:** Updates CRM settings with the provided data.
- **Request Body:** JSON object containing the fields to be updated.
- **Response:**
    - Status Code: 200 OK
    - Body: JSON object containing the updated CRM settings.
- **Error Responses:**
    - Status Code: 500 Internal Server Error
        - Body: JSON object with error message (`{ "error": "Failed to update CRM settings", "details": <error-details> }`)

### 3. Upload Image

- **URL:** `/crm/uploadImage`
- **Method:** POST
- **Description:** Uploads an image (logo or header) to update CRM settings.
- **Request Body:** Form data containing the image file to be uploaded and the type of image (`logoImage` or `headerImage`).
- **Response:**
    - Status Code: 200 OK
    - Body: JSON object with a success message and the URL of the uploaded image.
    - Example Response:
      ```json
      {
          "message": "Image uploaded successfully.",
          "url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      }
      ```
- **Error Responses:**
    - Status Code: 400 Bad Request
        - Body: JSON object with error message (`{ "error": "No file uploaded." }`)
    - Status Code: 404 Not Found
        - Body: JSON object with error message (`{ "error": "CRM settings not found." }`)
    - Status Code: 500 Internal Server Error
        - Body: JSON object with error message (`{ "error": "Error uploading image", "details": <error-details> }`)

## Testing with Postman

1. **Set Up Postman Environment:**
    - Download and install Postman from [Postman website](https://www.postman.com/downloads/).

2. **Create a Request:**
    - Open Postman and create a new request.
    - Set the request type to `POST` or `GET` depending on the endpoint you want to test.

3. **Set Request URL:**
    - Set the request URL to the appropriate endpoint (e.g., `/crm/settings`, `/crm/updateSettings`, `/crm/uploadImage`).

4. **Set Headers (if required):**
    - Add any required headers according to the endpoint documentation.

5. **Set Body (if required):**
    - For image upload, switch to the `Body` tab and choose `form-data`.
    - Add a key-value pair where the key is `image` and the value is the image file you want to upload.
    - If testing `updateSettings`, provide the fields to be updated in JSON format.

6. **Send Request:**
    - Click the `Send` button to send the request to the server.

7. **Verify Response:**
    - Check the response received from the server for the status code and response body.
