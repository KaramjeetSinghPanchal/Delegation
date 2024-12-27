// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const baseUrl = 'http://delegation-qa.zapbuild.in/api/';

// Login function using FormData

export const loginUser = async (phone_email, password) => {
  console.warn(phone_email, password, 'balle');

  try {
    console.log('Sending request to:', `${baseUrl}user-login`);

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
      throw new Error(
        errorResponse.message || 'Login failed. Please try again.',
      );
    }

    // If the response is successful, parse the JSON response
    const data = await response.json();

    if (data.data.token) {
      await AsyncStorage.setItem('authToken', data.data.token); // Store token in localStorage
      console.log('Token saved to AsyncStorage:', data.data.token);
    } else {
      console.error('No token found in response');
    }

    return data;
  } catch (error) {
    // Handle errors
    console.error('Error during fetch request:', error);
    throw new Error(error.message || 'An error occurred. Please try again.');
  }
};

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

export const delegationtask = async () => {
  try {
    const token = await gettoken(); // Get the token (ensure it's retrieved correctly)
    const response = await fetch(`${baseUrl}delegation-get-task`, {
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
    console.log('API response new:', data);
    return data; // Return the data if the request is successful
  } catch (error) {
    console.error('Error fetching users listing:', error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
};

// export const taskmangementlisting = async (selectedId) => {
//   const token = await gettoken();
//   const response = await fetch(`${baseUrl}task-listing&&status=${selectedId}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     console.warn('Failed to fetch error', response.status);
//     throw new Error('Failed to fetch data');
//   }

//   const data = await response.json();
//   return data.data;
// };



export const taskmangementlisting = async (page=0) => {
  const token = await gettoken();
  const response = await fetch(`${baseUrl}task-listing?page=${page}`, {
    
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  // console.warn(response,"responsee");
  

  if (!response.ok) {
    console.warn('Failed to fetch error', response.status);
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data.data;
};
