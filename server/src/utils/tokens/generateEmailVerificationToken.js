import jwt from 'jsonwebtoken';

const generateEmailVerificationToken = (customer) => {
    return jwt.sign(
        {
            _id: customer._id,
            email: customer.email,
        },
        process.env.EMAIL_VERIFICATION_SECRET,
        {
            expiresIn: '1h'
        }
    );
}

export { generateEmailVerificationToken };