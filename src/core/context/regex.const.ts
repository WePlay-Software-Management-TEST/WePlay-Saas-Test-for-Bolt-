export const passwordPattern =
/^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;

export const emailPattern = /\S+@\S+\.\S+/;

export const numberPattern = /^\d+$/;
export const namePattern = /^[a-zÀ-ÿ ,.'-]+$/i;
export const isSafariBrowser = /^((?!chrome|android).)*safari/i;
