// api.js

const baseUrl = 'http://delegation-qa.zapbuild.in/api/';

// Login function using FormData
export const loginUser = async (phone_email, password) => {
  console.warn(phone_email, password,"balle");

  try {
    console.log("Sending request to:", `${baseUrl}user-login`);

    // Create FormData object to append the form fields
    const formData = new FormData();
    formData.append('phone_email', phone_email);
    formData.append('password', password);

    // Make the fetch request
    const response = await fetch(`${baseUrl}user-login`, {
      method: 'POST',
      body: formData,
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error response:', errorResponse);
      throw new Error(errorResponse.message || 'Login failed. Please try again.');
    }

    // If the response is successful, parse the JSON response
    const data = await response.json();
    console.log('Login successful', data);

    return data;
  } catch (error) {
    // Handle errors
    console.error('Error during fetch request:', error);
    throw new Error(error.message || 'An error occurred. Please try again.');
  }
};


export const listing = async () => {
  try {
    console.log("Sending request to:", `${baseUrl}delegatees-listing`);

    // Send the request with credentials (cookies) included
    const response = await fetch(`${baseUrl}delegatees-listing`, {
      method: 'GET',
      credentials: 'include',  // Ensures cookies are sent with the request
      headers: {
        'Content-Type': 'application/json',
        // Optionally add other headers like Authorization or X-CSRF-Token
        // 'Authorization': 'Bearer <your_token>',
        // 'X-CSRF-Token': '<your_token>',
      }
    });

    // Log the response status and headers for debugging
    console.log('Response Status:', response.status);
    console.log('Response Headers:', JSON.stringify(response.headers));

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();  // Log the response as text in case of an error
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch users list. Status: ${response.status}`);
    }

    // Read the response body
    const responseText = await response.text();
    console.log("Raw response body:", responseText);

    // If the response body starts with '<html>', it's likely an HTML error page (login page, 404, etc.)
    if (responseText.startsWith("<html>")) {
      throw new Error("Received HTML response, likely an error page. Check the API server.");
    }

    // Parse the response as JSON if it's valid
    const data = JSON.parse(responseText);
    console.warn("Fetched users list successfully:", data);

    return data;

  } catch (error) {
    console.error('Error fetching users listing:', error.message);
    return null;  // Return null or an empty array if there's an error
  }
};

