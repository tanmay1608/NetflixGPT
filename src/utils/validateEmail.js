
    export  const validateEmail = (email) => {
        // Ensure email is a non-empty string
        if (typeof email !== 'string' || email.trim() === '') {
          return "Email is required";
        }
      
        // Trim email to remove any leading/trailing whitespace
        email = email.trim();
      
        // Check if '@' is present
        const atSymbolIndex = email.indexOf('@');
        if (atSymbolIndex === -1) {
          return "Email must contain '@' symbol";
        }
      
        // Split email into local part and domain part
        const [localPart, domain] = email.split('@');
        if (!domain) {
          return "Email is missing domain part after '@'";
        }
      
        // Check if the domain contains a dot and has a valid TLD
        const dotIndex = domain.lastIndexOf('.');
        if (dotIndex === -1 || dotIndex === domain.length - 1) {
          return "Email domain must contain a '.' followed by a valid top-level domain (e.g., .com)";
        }
      
        // Check if local part contains only valid characters
        const localPartRegex = /^[a-zA-Z0-9._%-]+$/;
        if (!localPartRegex.test(localPart)) {
          return "Local part of email (before '@') contains invalid characters";
        }
      
        // Check if domain contains only valid characters (excluding top-level domain)
        const domainWithoutTLD = domain.slice(0, dotIndex);
        const domainRegex = /^[a-zA-Z0-9.-]+$/;
        if (!domainRegex.test(domainWithoutTLD)) {
          return "Email domain contains invalid characters";
        }
      
        // Check if top-level domain is valid
        const topLevelDomain = domain.slice(dotIndex + 1);
        const topLevelDomainRegex = /^[a-zA-Z]{2,}$/;
        if (!topLevelDomainRegex.test(topLevelDomain)) {
          return "Top-level domain must be at least 2 characters long and contain only letters (e.g., .com)";
        }
      
        // All checks passed
        return null;
      };
      
