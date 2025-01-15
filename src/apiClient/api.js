// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useState} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';

const baseUrl = 'http://delegation-qa.zapbuild.in/api/';

// Login function using FormData

export const loginUser = async(phone_email,password)=>{
    console.warn("Email-Password=>",phone_email,password);
    const formData = new FormData();
    formData.append('phone_email', phone_email);
    formData.append('password', password);
    console.log('Sending request to:', `${baseUrl}user-login`);

    const response = await fetch(`${baseUrl}user-login`, {
      method: 'POST',
      body: formData, // Pass FormData as the body
    });
    console.warn("response==>",response);

    const data = await response.json();
    return data

    
    
}


const gettoken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      return token;
    } else {
      throw new Error('Token not found in "gettoken"');
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw error;
  }
};

export const listing = async () => {
  try {
    const token = await gettoken(); // Get the token (ensure it's retrieved correctly)
    const response = await fetch(`${baseUrl}user-listing`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch users, status:', response.status);
      return null; // Return null or handle the error as needed
    }

    const data = await response.json();
    console.log('API response:', data);
    return data; // Return the data if the request is successful
  } catch (error) {
    console.error('Error fetching users listing:', error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
};

export const delegationtask = async (status) => {
  try {
    const token = await gettoken(); // Get the token (ensure it's retrieved correctly)
    const response = await fetch(
      `${baseUrl}delegation-get-task?status=${status}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      console.error('Failed to fetch users, status:', response.status);
      return null; // Return null or handle the error as needed
    }

    const data = await response.json();
    console.log('API response new:', data);
    return data; // Return the data if the request is successful
  } catch (error) {
    console.error('Error fetching users listing:', error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
};

export const delegationtaskk = async (status,formattedDate) => {
  try {
    const token = await gettoken(); // Get the token (ensure it's retrieved correctly)
    const response = await fetch(
      `${baseUrl}delegation-get-task?status=${status}&filterByDateRange${formattedDate}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.warn('response data======>',response);

    if (!response.ok) {
      console.error('Failed to fetch users, status:', response.status);
      return null; // Return null or handle the error as needed
    }

    const data = await response.json();
    console.log('API response new:', data);
    return data; // Return the data if the request is successful
  } catch (error) {
    console.error('Error fetching users listing:', error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
};   




// export const report = async ({formattedDate}) => {
//   Alert.alert("entered");
//   console.warn("formattedDate===>", formattedDate);

//   const token = await gettoken();
//   const url = `${baseUrl}generate-report?report_type=pdf&assigned_date=${formattedDate}`;

//   console.warn("Request URL:", url);
//   console.warn("Token:", token);

//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json', // Still sending JSON content type, even if PDF is returned
//     },
//   });

//   Alert.alert("before API");

//   if (!response.ok) {
//     const errorText = await response.text();  // Get raw error response
//     console.error('Failed to fetch, status:', response.status);
//     console.error('Error response:', errorText);
//     return null; // Return null or handle error accordingly
//   }

//   Alert.alert("beforenear API");

//   const contentType = response.headers.get("Content-Type");
//   console.warn("Content-Type:", contentType);

//   // If the response is a PDF
//   if (contentType.includes("application/pdf")) {
//     const blob = await response.blob(); // Handle binary data (PDF)
//     console.warn("Received PDF Blob:", blob);

//     return blob;
//   } else {
//     const text = await response.text();
//     console.warn('Raw response:', text);
//     return text;
//   }
// };

export const report = async formattedDate => {
  console.warn('formattedDate', formattedDate);

  // Build the correct URL by adding the missing query parameters
  const fullUrl = `http://delegation-qa.zapbuild.in/api/generate-report?tab=other-user-task&report_type=pdf&user_id=&assigned_date=${formattedDate}&due_date=&filter_status=&status=&searchQuery=`;

  console.warn('fullUrl', fullUrl);

  const token = await gettoken(); // Assuming gettoken() is an async function that retrieves your token

  try {
    // Fetch the report from the server as binary data
    const response = await ReactNativeBlobUtil.fetch('GET', fullUrl, {
      Authorization: `Bearer ${token}`,
    });

    // Check if the response status is OK (200)
    if (response.respInfo.status === 200) {
      // Get the binary data (PDF)
      const pdfData = response.data;
      console.log('PDF Data:', pdfData);

      // Define where to save the PDF file (inside DocumentDir)
      const savedPath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/report.pdf`;

      // Save the PDF file as a binary file
      await ReactNativeBlobUtil.fs.writeFile(savedPath, pdfData, 'base64'); // Using 'base64' because it's the expected format for binary data
      console.log('PDF saved at:', savedPath);

      // Check if the file exists at the saved path
      const fileExists = await ReactNativeBlobUtil.fs.exists(savedPath);

      if (fileExists) {
        console.log('PDF file downloaded and exists at:', savedPath);
        return savedPath; // Return the path of the saved file
      } else {
        console.error('PDF file does not exist at the specified path.');
        return null;
      }
    } else {
      console.error('Failed to fetch the report:', response.respInfo);
      return null;
    }
  } catch (error) {
    console.error('Error fetching the report:', error);
    return null;
  }
};

export const taskmangementlisting = async ({
  currentPage = 1,
  status,
  searchQuery = '', //I can pass here the default value
  assigned_date,
}) => {
  const token = await gettoken();
  let fetchUrl = baseUrl + 'task-listing?page=' + currentPage;
  if (status) fetchUrl += '&status=' + status;
  if (searchQuery) fetchUrl += '&searchQuery=' + searchQuery;
  if (assigned_date) fetchUrl += '&assigned_date=' + assigned_date; // Make sure assigned_date is added

  console.warn('Listing fetchUrl:', fetchUrl); // Debug log for the URL

  const response = await fetch(fetchUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.warn('Failed to fetch error', response.status);
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  console.warn('Listing response:', data); // Log the full response

  return data.data; // Ensure 'data.data' is the correct structure
};
