import jwt from 'jsonwebtoken';
import { secret } from '../Database/databaseConfiguration.js';

export function verifyUserToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      if(decoded.ROLE === 'user'){
        req.PERSON_ID = decoded.PERSON_ID;
        req.USER_NAME = decoded.USER_NAME;
        next();
      }else{
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      
    });
  }

  export function verifyAdminToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      if(decoded.ROLE === 'admin'){
        req.PERSON_ID = decoded.PERSON_ID;
        req.ADMIN_NAME = decoded.ADMIN_NAME;
        next();
      }else{
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      
    });
  }

  export function verifyGeneralToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      if(decoded.ROLE === 'admin'){
        req.PERSON_ID = decoded.PERSON_ID;
        req.ADMIN_NAME = decoded.ADMIN_NAME;
        next();
      }else if(decoded.ROLE === 'user'){
        req.PERSON_ID = decoded.PERSON_ID;
        req.USER_NAME = decoded.USER_NAME;
        next();
      }else{
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      
    });
  }