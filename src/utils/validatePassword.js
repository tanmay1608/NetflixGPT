

export const validatePassword = (password) => {
    const feedback="Password must be at least 8 characters long and contains A-Z, a-z, 0-9, and special characters(e.g., @, #, $)"
  
    // Define the regex for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]).{8,}$/;
    
    // Check if password is provided
    if (!password) return "Password is required";
    
    // Check if password matches the regex
    if (!passwordRegex.test(password)) {
      return feedback;
    }
  
    // If all checks pass
    return null;
  };
  

  