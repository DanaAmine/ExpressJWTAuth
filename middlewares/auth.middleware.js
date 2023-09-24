module.exports.authenticateToken = (req, res, next)=> {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    }
    
    req.user = user;
    next();
  });
}