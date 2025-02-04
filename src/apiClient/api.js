// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';

const baseUrl = 'http://delegation-qa.zapbuild.in/api/';

// Login function using FormData

export const loginUser = async (phone_email, password) => {

  try {
    // console.log('Sending request to:', `${baseUrl}user-login`);
    const formData = new FormData();
    formData.append('phone_email', phone_email);
    formData.append('password', password);
    const response = await fetch(`${baseUrl}user-login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error response:', errorResponse);
      throw new Error(
        errorResponse.message || 'Login failed. Please try again.',
      );
    }

    const data = await response.json();
    console.log('datadatadata', data);

    if (data.data.token) {
      await AsyncStorage.setItem('authToken', data.data.token);
    } else {
      console.error('No token found in response');
    }

    return data;
  } catch (error) {
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

export const listing = async ({ page = 1, searchQuery = '' }) => {
  try {
    const token = await gettoken(); // Get the token
    let fetchUrl = `${baseUrl}user-listing?page=${page}`;

    if (searchQuery) fetchUrl += `&searchQuery=${searchQuery}`;

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      console.error('Failed to fetch users, status:', response.status);
      return null;
    }

    const data = await response.json();
    return data; // Ensure data is returned
  } catch (error) {
    console.error('Error fetching user listing:', error);
    return null;
  }
};


export const delegationtask = async status => {
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
    // console.log('API response new:', data);
    return data; // Return the data if the request is successful
  } catch (error) {
    console.error('Error fetching users listing:', error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
};

export const report = async formattedDate => {
  console.warn('formattedDate', formattedDate);

  // Build the correct URL by adding the missing query parameters
  const fullUrl = `http://delegation-qa.zapbuild.in/api/generate-report?tab=other-user-task&report_type=pdf&user_id=&assigned_date=${formattedDate}&due_date=&filter_status=&status=&searchQuery=`;


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
  page = 1,
  status,
  searchQuery = '',
  assigned_date,
}) => {
  const token = await gettoken();
  let fetchUrl = `${baseUrl}task-listing?page=${page}`;
  if (status) fetchUrl += `&status=${status}`;
  if (searchQuery) fetchUrl += `&searchQuery=${searchQuery}`;
  if (assigned_date) fetchUrl += `&assigned_date=${assigned_date}`;

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
  return data.data; // Return the entire data object, including pagination info
};

export const userdetails = async user_id => {
  const token = await gettoken();

  let fetchUrl = `${baseUrl}user-view?user_id=${user_id}`;

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
  return data.data;
};

export const updateUser = async ({payload}) => {

  try {
    const token = await gettoken();
    const fetchUrl = `${baseUrl}user-update`;
    const formData = new FormData();
    formData.append('first_name', payload.first_name);
    formData.append('last_name', payload.last_name);
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('user_id', payload.userId);
    formData.append('type', payload.type);

    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to update user');
    }

    return data;
  } catch (error) {
    console.error('Error in updateUser:', error.message);
    return {success: false, message: error.message};
  }
};
