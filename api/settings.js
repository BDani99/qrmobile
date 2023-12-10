const apiUrl = "http://10.0.2.2:5000";

const updateProfile = async (accessToken, userId, userData) => {
  const endpoint = `${apiUrl}/profil`;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": accessToken,
    "User-Id": userId,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      console.error("API hiba:", response.status, response.statusText);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error("Hálózati hiba:", error);
    return { success: false, error: "Hálózati hiba" };
  }
};

export { updateProfile };
