
import jwt from 'jsonwebtoken';
// eslint-disable-next-line
export const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const baseUrl = "http://localhost:5000/"
export const verifyToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwt.decode(token);
    if (decodedToken.exp < new Date().getTime()) return decodedToken
    return null

}