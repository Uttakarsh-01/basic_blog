const {Router} = require('express');
const user = require('../models/user');
const router = Router();

router.post('/signin',async(req,res)=>{
    const {fullName,email,password} = req.body;
 const user =  User.matchPassword(email,password);
  
    console.log('User',user)
    return res.redirect('/');
});





router.get('/signup',(req,res)=>{
    return res.render("signup");
});

// router.get('/signup',(req,res)=>{
//     return res.render("signup");
// });

// router.post('/signup',async(req,res)=>{
//     const {fullName,email,password} = req.body;
//     await user.create({
//         fullName,
//         email,
//         password,
//     }); 

//     return res.redirect("/");
// });

router.post('/signup', async (req, res) => {
    console.log(req.body); // Debug: Log the request body

    const { fullName, email, password } = req.body;

    // Ensure all fields are provided
    if (!fullName || !email || !password) {
        return res.status(400).send("All fields are required.");
    }

    try {
        await user.create({
            fullName,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong.");
    }
});

module.exports = router;