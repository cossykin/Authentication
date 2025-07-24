// export function sessionAuth(req, res, next) {
//   if (req.session && req.session.userId) {
//     next(); // session valid, proceed
//   } else {
//     res.status(401).json({ message: 'Unauthorized: No active session' });
//   }
// }

// app/middlewares/sessionAuth.js
export default function sessionAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized, please log in' });
}
