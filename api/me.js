const apiUrl = 'http://10.0.2.2:5000';

export const getCurrentUser = async (accessToken, userId) => {
  const url = `${apiUrl}/@me`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
        'User-Id': userId,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
