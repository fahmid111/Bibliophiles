import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from '../Database/databaseConfiguration.js';
import { findAdminDB, findPersonDB, findUserDB, postAdminDB, postUserDB } from '../Database/queryFunctions.js';
export async function loginUser(req, res, next) {
    try {
      var user = {
        USER_NAME: req.body.USER_NAME,
        PASSWORD: req.body.PASSWORD
      };
  
      const foundUser = await findUserDB(user);

      if (foundUser.length == 0) {
          return res.status(400).send('Cannot find user');
      }else{
        try {
            var passwordIsValid = bcrypt.compareSync(
                req.body.PASSWORD,
                foundUser[0].PASSWORD
              );
              
            if(passwordIsValid) {
                var token = jwt.sign({ PERSON_ID: foundUser[0].PERSON_ID, USER_NAME: foundUser[0].USER_NAME, ROLE: 'user' }, secret, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  res.status(200).json({ auth: true, token: token });
                } else {
                    res.status(401).json({ auth: false, token: null });
            }
          } catch(err) {
            res.status(500).send(err.message);
          }
      }
      
    } catch (err) {
        res.status(500).send(err.message);
    }
}

  export async function loginAdmin(req, res, next) {
    try {
      var admin = {
        ADMIN_NAME: req.body.ADMIN_NAME,
        PASSWORD: req.body.PASSWORD
      };
  
      const foundAdmin = await findAdminDB(admin);

      if (foundAdmin.length == 0) {
          return res.status(400).send('Cannot find admin');
      }else{
        try {
            var passwordIsValid = bcrypt.compareSync(
                req.body.PASSWORD,
                foundAdmin[0].PASSWORD
              );
            if(passwordIsValid) {
                var token = jwt.sign({ PERSON_ID: foundAdmin[0].PERSON_ID, ADMIN_NAME: foundAdmin[0].ADMIN_NAME, ROLE: 'admin' }, secret, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  res.status(200).json({ auth: true, token: token });
            } else {
                res.status(401).json({ auth: false, token: null });
            }
          } catch(err) {
            res.status(500).send(err.message);
          }
      }
      
    } catch (err) {
        res.status(500).send(err.message); 
    }
  }


  export async function postUser(req, res, next) {
    try {
      let emailToLow = null;  
        if(req.body.EMAIL){
          emailToLow = req.body.EMAIL.toLowerCase();
      }
      const hashedPassword = await bcrypt.hashSync(req.body.PASSWORD, 10)
      var user = {
        FIRST_NAME: req.body.FIRST_NAME,
        LAST_NAME: req.body.LAST_NAME,		
        ADDRESS: req.body.ADDRESS,
        EMAIL: emailToLow,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        DETAILS: req.body.DETAILS,
        USER_NAME: req.body.USER_NAME,
        PASSWORD: hashedPassword
      };
  
      user = await postUserDB(user);
      const foundUser = await findUserDB(user);
      
      var token = jwt.sign({ PERSON_ID: foundUser[0].PERSON_ID, USER_NAME: foundUser[0].USER_NAME, ROLE: 'user' }, secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({ auth: true, token: token });
      
    } catch (err) {
        res.status(500).send(err.message);    }
  }
  
  export async function postAdmin(req, res, next) {
    try {
      let emailToLow = null;  
        if(req.body.EMAIL){
          emailToLow = req.body.EMAIL.toLowerCase();
      }
      const hashedPassword = await bcrypt.hashSync(req.body.PASSWORD, 10)
      var admin = {
        FIRST_NAME: req.body.FIRST_NAME,
        LAST_NAME: req.body.LAST_NAME,		
        ADDRESS: req.body.ADDRESS,
        EMAIL: emailToLow,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        DETAILS: req.body.DETAILS,
        ADMIN_NAME: req.body.ADMIN_NAME,
        PASSWORD: hashedPassword
      };
  
      admin = await postAdminDB(admin);
      const foundAdmin = await findAdminDB(admin);

      
      var token = jwt.sign({ PERSON_ID: foundAdmin[0].PERSON_ID, ADMIN_NAME: foundAdmin[0].ADMIN_NAME, ROLE: 'admin' }, secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({ auth: true, token: token });
      
    } catch (err) {
        res.status(500).send(err.message);
    }
  }

  export async function decodeToken(req, res){
    try {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
        jwt.verify(token, secret, async function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        if(decoded.ROLE==='user'){
            var user = {
                USER_NAME: decoded.USER_NAME
             };
      
            const foundUser = await findUserDB(user);
            foundUser[0].PASSWORD = null;
      
            if (foundUser.length == 0) {
                return res.status(400).send('Cannot find user');
            }

            const foundPerson = await findPersonDB(foundUser[0].PERSON_ID);

            if (foundPerson.length == 0) {
                return res.status(400).send('Cannot find user');
            }

            foundPerson[0].USER_NAME = foundUser[0].USER_NAME;
    
            res.status(200).json(foundPerson);
        }else{
            var admin = {
                ADMIN_NAME: decoded.ADMIN_NAME
             };
      
            const foundAdmin = await findAdminDB(admin);
            foundAdmin[0].PASSWORD = null;
      
            if (foundAdmin.length == 0) {
                return res.status(400).send('Cannot find admin');
            }
    
            const foundPerson = await findPersonDB(foundAdmin[0].PERSON_ID);

            if (foundPerson.length == 0) {
                return res.status(400).send('Cannot find admin');
            }

            foundPerson[0].ADMIN_NAME = foundAdmin[0].ADMIN_NAME;
    
            res.status(200).json(foundPerson);
        }
    });
        
      } catch (err) {
        res.status(500).send(err.message);
    }    
}

export function logout(req, res) {
    res.status(200).json({ auth: false, token: null });
}