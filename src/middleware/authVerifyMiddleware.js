const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.access_token;
    
    if (!token) {
        return res.status(401).json({ status: "Error", message: "Token Not Found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: "Error", message: "Token is not valid", data: err });
        }
        req.user = decoded;
        next();
    });
};

exports.verifyUser = (req, res, next) => {
    exports.verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ status: "Error", message: "You are not authorized" });
        }
    });
};

exports.verifyAdmin = (req, res, next) => {
    exports.verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ status: "Error", message: "You are not authorized" });
        }
    });
};

