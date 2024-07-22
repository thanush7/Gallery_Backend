import profileModel from "../models/ProfileModel.js";
import fs from 'fs'
const addProfile = async (req, res) => {
    let image_file = `${req.file.filename}`;
    const image = new profileModel({
        proImage: image_file,
        bio: req.body.bio,
        whatsapp: req.body.whatsapp,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        email: req.body.email
    })

    try {
        await image.save();
        res.json({ success: true, message: 'image added' });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: 'not added' })
    }
}

const listProfile = async (req, res) => {
    try {
        const profiles = await profileModel.find({});
        res.json({ success: true, data: profiles });
    }
    catch (error) {
        console.log(error);
        res.json({ success: true, message: 'error' });
    }


}
const editProfile = async (req, res) => {
    const { bio, whatsapp, instagram, facebook, email } = req.body;
    const proImage = req.file ? `${req.file.filename}` : undefined;

    try {
        const profile = await profileModel.findById(req.params.id);
        // console.log(profile.proImage);
       
   
        // if (!profile) {
        //    console.log('error')
        // }
        // console.log(bio,profile.bio);
        // profile.bio = bio ?bio:profile.bio;
        // profile.whatsapp = whatsapp?whatsapp: profile.whatsapp;
        // profile.instagram = instagram?instagram:profile.instagram;
        // profile.facebook = facebook?facebook: profile.facebook;
        // console.log(email,profile.email);
        // profile.email = email?email: profile.email;
        // console.log(email,profile.email);
        if (proImage) {
            fs.unlink(`puploads/${profile.proImage}`,()=>{});
            profile.proImage = proImage;
        }
        console.log(bio,profile.bio);
        
        if(bio) { profile.bio=bio;}
        else{profile.bio=profile.bio}
        console.log(bio,profile.bio);
        if(whatsapp) { profile.whatsapp=whatsapp;}
        if(instagram) { profile.instagram=instagram;}
        if(facebook) { profile.facebook=facebook;}
        if(email) { profile.email=email;}
        
        await profile.save();
        res.json({success:true});
    }
    catch (error) {
        console.log(error)
      }
}
const getbyId=async (req, res) => {
    try {
      const profile = await profileModel.findById(req.params.id);
      if (!profile) {
       console.log('error');
      }
      res.json(profile);
    } catch (error) {
      console.log(error);
    }
  };
  

export { addProfile, listProfile,editProfile,getbyId}