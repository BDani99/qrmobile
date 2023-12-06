
const loginUser = async (email, password) => {
  try {
    const response = await fetch('http://10.0.2.2:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.admin) {
        return { success: true, data: data };
      } else {
        return { success: false, error: 'Nincs megfelelő jogosultság' };
      }
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: 'Hiba a szerverrel való kommunikáció során' };
  }
};

export default loginUser;