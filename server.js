const express = require ('express');
const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const Usersdata = require ('./model');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://sundrpllitanuja231006_db_user:hBZo2hR4WaA9E6hB@cluster0.gbyauu1.mongodb.net/').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));
app.post('/add_user', async (req, res) => {
    const {username} = req.body;
    const {email} = req.body;
    const {Password} = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed_Password = await bcrypt.hash(Password,salt);

        const newUser = new Usersdata({username, email, Password: hashed_Password});
            await newUser.save();
            return res.status(200).json({'User successfully added': newUser});
    }
    catch(err){
        console.log(err);
    }
})

app.post('/login_user', async (req, res) => {
    try{
        const {email} = req.body;
        const {Password} = req.body;
        const founduser = await Usersdata.findOne({email});
        await bcrypt.compare(Password, founduser.Password);
        return res.json({
            message: 'LOGIN SUCCESSFUL',
            user:{
                id: founduser._id,
                username: founduser.username,
                email: founduser.email
            }});
    }
    catch(err){
        console.log(err);       
            }
        });
app.listen(3000, () => console.log('Server is running on http://localhost:3000'))