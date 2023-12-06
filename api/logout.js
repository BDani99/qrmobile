
const API_BASE_URL = 'http://10.0.2.2:5000';

export const logoutUser = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({ userId: userId }),
    });

    if (response.ok) {
      console.log('User logged out successfully');
      return true;
    } else {
      console.error('Logout failed with status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};

