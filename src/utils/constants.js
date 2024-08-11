const LOGO_URL =
  "https://res.cloudinary.com/dilrojpva/image/upload/v1723396109/watchflow-removebg-preview_1_vafnrj.png";

const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_large.jpg";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

const SUPPORTED_LANGUAGES = [
  {
    identifier: "en",
    name: "English",
  },
  { identifier: "hindi", name: "Hindi" },
];
const OPENAI_KEY =
  "sk-S7ziQQYAgEAZtoM2d22gw5zcV80cg7Rk4SutjOmzQ7T3BlbkFJQyxl2q4WTc6cC-_eRlvww53h6CfAsgU6TJsASEUSoA";
export {
  LOGO_URL,
  BG_URL,
  API_OPTIONS,
  IMG_CDN_URL,
  SUPPORTED_LANGUAGES,
  OPENAI_KEY,
};
