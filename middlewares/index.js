import expressJwt from "express-jwt" 
import User from '../models/user'
import Post from "../models/post"
import Media from "../models/media"
import Comment from "../models/comment"

require("dotenv").config();

export const requireSignin = expressJwt ({
     secret: process.env.JWT_SECRET, 
     algorithms: ["HS256"] ,

})


export const isAdmin = async (req, res, next ) => {
     try {
          const user = await User.findById(req.user._id)
          console.log("see the user", user);

          if(user.role !== 'Admin') {
               return res.status(403).send ('Unauthorized')
          } else {
               next()
          }
     } catch (error) {
          console.log(error);
     }
}

export const isAuthor = async (req, res, next ) => {
     try {
          const user = await User.findById(req.user._id)
          console.log("see the user", user);

          if(user.role !== 'Author') {
               return res.status(403).send ('Unauthorized')
          } else {
               next()
          }
     } catch (error) {
          console.log(error);
     }
}




export const canCreateRead = async (req, res, next) => {
     try {
          
          const user = await User.findById(req.user._id)
          switch(user.role) {
               case "Admin" : 
               next ()
               break
               case "Author":
               next ()
               break
               default: 
               return res.status(403).send ("Unauthorized")
          }
     } catch (error) {
          console.log(error);
     }
}
export const canUpdateDeletePost = async (req, res, next) => {
     try {
          const user = await User.findById(req.user._id)
          const post = await Post.findById(req.params.postId)
          switch (user.role) {
               case "Admin" : 
               next ()
               break

               case "Author" :
                    if (post.postedBy.toString() !== user._id.toString()){
                       return res.status(403).send("Unauthorized")
                    } else {
                         next ()
                    }
                     break
                    default: 
                    return res.status(403).send("Unauthorized")

          }
     } catch (error) {
          console.log(error);
     }
}


export const canDeleteMedia = async (req, res, next) => {
     try {
          const user = await User.findById(req.user._id)
          const media = await Media.findById(req.params.id)
          switch(user.role){
              case "Admin" : 
              next()
              break
              case "Author" :
               if (media.postedBy.toString() !==  req.user._id.toString()){
                  return res.status(403).send("Unauthorized")
               } else {
                    next ()
               }
                break
               default: 
               return res.status(403).send("Unauthorized")
          }
     } catch (error) {
          console.log(error);
     }
}


export const canUpdateDeleteComment = async (req, res, next) => {
     try {
          const { commentId } = req.params
          const comment = await Comment.findById(commentId)
          const user = await User.findById(req.user._id)
          switch(user.role){
               case "Admin" : 
               next()
               break

               case "Author" : 
               if (comment.postedBy.toString() === req.user._id.toString()) {
                    next()
               }
               break
               case "Subscriber" : 
               if (comment.postedBy.toString() === req.user._id.toString()) {
                    next()
               }
               break
               default:
                    return res.status(403).send("Unauthorized")
          }


     } catch (error) {
          console.log(error);
     }
}