const mongoose= require("mongoose");
const schema=mongoose.Schema;
const UserSchema = new schema(
    {
        username:{
            type : String, 
            required : [false, "the username is required"],
            trim : true, 
             unique:true,
            minlenght : 3,
            maxlength : 50,
           
        },
        email:{
            type : String, 
            required : [true, "the email is required"],
            trim : true, 
            unique:true,
        },
        password:{
            type:String,
            unique :[true,"this password is required"],
            trim:true,
            minlenght : 5,
        },
        avatar:{
            type: String,
            default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

        },
    },
 {timestamps:true}
    
);

module.exports = mongoose.model("User",UserSchema);