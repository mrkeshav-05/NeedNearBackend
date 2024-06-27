import jwt from 'jsonwebtoken';

const generateRefreshToken = (customer) => {
    return jwt.sign(
        {
            _id: customer._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
        }
    );
}

export { generateRefreshToken };
