
export const checkValidData=(email,password,name)=>{
   
       const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
   if(!isEmailValid) return "Email is Invalid"
  const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if(!isPasswordValid) return "Password is Invalid"
  if(name === null) return null;
  const isNameValid=/^[a-zA-Z\s-]+$/.test(name);
  if(!isNameValid) return "Name is Invalid"

   return null;
}

