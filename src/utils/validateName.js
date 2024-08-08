export const validateName = (name) => {
    if(name === null) return null;
  if(name.length === 0) return "Name is required";
  if (name.trim() === '') return "Name is required";
  
    // Define the regex for name validation
    const nameRegex = /^[a-zA-Z\s-]+$/;
  
   
  
    // Check if name matches the regex
    if (!nameRegex.test(name)) {
      return "No special characters or numbers are allowed.";
    }
  
    // If all checks pass
    return null;
  };
  