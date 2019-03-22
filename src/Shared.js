
import jwt from 'jsonwebtoken';
// eslint-disable-next-line
export const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const baseUrl = "https://immense-savannah-98652.herokuapp.com/"
export const verifyToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwt.decode(token);
    if (decodedToken.exp > Date.now() / 1000) return decodedToken
    return null
}