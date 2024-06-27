import jwt from 'jsonwebtoken';

const generateAccessToken = (customer) => {
    return jwt.sign(
        {
            _id: customer._id,
            email: customer.email,
            fullName: customer.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
        }
    );
}

export { generateAccessToken };