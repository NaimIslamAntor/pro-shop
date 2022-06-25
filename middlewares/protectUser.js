import jwt from 'jsonwebtoken'

const protectUser = handler => async (req, res) => {
  
    const authorization = req.headers.authorization


    if(!authorization){
        return res.status(403).json({message: 'Sorry you are not authorize to do that'})
    }


    if(!authorization.startsWith('Bearer')){
        return res.status(403).json({message: 'Sorry token type not supported'})
    }


    const token = authorization.split(' ')[1]



    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Sorry you are not authorize to do that'})
        }

        req.user = user
        return handler(req, res);
        
    })




  };
  
  export default protectUser