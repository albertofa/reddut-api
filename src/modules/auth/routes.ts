import { User } from "../users/entity";
import { loginSchema } from "./schema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default function authHandler(server, options, next) {
    server.post('/login', 
        { schema: loginSchema }, 
        async (req, res) => {
            if(!req.body.username && !req.body.email)
                throw {name: 'missing_propertiers', message: `should have required property 'email' or 'username'.`} as Error
            else {
                let user: User | null = null
                if(req.body.username)
                    user = await User.findByUsername(req.body.username )
                else
                    user = await User.findByEmail(req.body.email)
               
                if(user){
                    bcrypt.compare(req.body.password, user.password, function(err, result) {
                        if(result){
                            const response: any = user
                            response.token = jwt.sign({
                                user, 
                                iat: Math.floor(Date.now() / 1000) - 30 
                            }, process.env.JWT_SECRET);

                            res.status(200).send(response);
                        }
                        else
                            res.status(401).send({ status: 'Invalid credentials' });
                    })
                }else
                    throw {name: 'does_not_exist', message: `user with requested properties does not exist.`} as Error
            }
        }
    );

	next();
}
