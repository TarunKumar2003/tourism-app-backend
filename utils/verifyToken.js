import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// export const verifyToken = (req, res, next) => {
//     // const token = req.body.token || req.query.token || req.headers["x-access-token"];
//     const token = req.cookies.accessToken;
//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Access token not found, not authorized "});
//     }
//     try {
//         // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // req.user = decoded;
//         jwt.verify(token, process.env.JWT_SECRET,(err, user) => {
//             if (err) {
//                 return res.status(401).json({
//                     success: false,
//                     message: "Invalid Token"
//                 });
//             }
//             req.user = user;
//             next();
//         });
//     } catch (err) {
//         return res.status(401).send("Invalid Token");
//     }
//     return next();
// }
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token not found, not authorized"
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Token"
                });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

// export const verifyUser = (req, res, next) => {
//     verifyToken(req, res, next,() => {
//         if (req.user.id === req.params.id || req.user.role === "admin") {
//             next();
//         } else {
//             return res.status(401).json({
//                 success: false,
//                 message: "You are not authenticated"
//             });
//         }
//     });
// }
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        const reqId = req.params.id;
        if (req.user ) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "You are not authenticated"
            });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next,() => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized"
            });
        }
    });
}