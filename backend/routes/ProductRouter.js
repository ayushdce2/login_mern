const router = require("express").Router();
const {EnsureAuthenticated} = require("../middleware/EnsureAuthenticated");


router.get("/",EnsureAuthenticated,(req,res)=>{
    console.log(req.user) //to access user details without making db call everytime
    res.status(200).json([
        {
            name: "name demo",
            price: 1000
        },
        {
            name: "name demo 1",
            price: 1001
        }
    ])
});

module.exports = router;