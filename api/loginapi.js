const API_URL = "http://10.0.2.2:5000/login"; // Cseréld le a megfelelő szerver URL-re

const loginUser = async (email, password) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Hibás válasz a szervertől");
    }

    // Visszaadjuk az user objektumot helyett a true-t, ha sikeres a bejelentkezés
    return true;

  } catch (error) {
    throw new Error("Hiba a bejelentkezés során: " + error.message);
  }
};

export default loginUser;
