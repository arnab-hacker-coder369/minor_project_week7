const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get token from header[span_4](start_span)[span_4](end_span)
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if no token[span_5](start_span)[span_5](end_span)
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token[span_6](start_span)[span_6](end_span)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // Add user ID from payload to request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;