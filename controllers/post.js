import cloudinary from 'cloudinary'
import Post from '../models/post'
import slugify from 'slugify'
import Category from '../models/category'
import Media from '../models/media'
import User from "../models/user"
import Comment from "../models/comment"

 




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

export const uploadImage = async (req, res) => {
    try {
        // console.log(req.body);
        const result = await cloudinary.uploader.upload(req.body.image)
        res.json(result.secure_url)
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, content, categories } = req.body
    
        //   check if title is taken
        const alreadyExist = await Post.findOne({
            slug: slugify(title.toLowerCase()),
        });
        if (alreadyExist) return res.json({ error: 'Title is taken' })

            // get category ids based on category name
        let ids = [];
        for (let i = 0; i < categories.length; i++) {
            Category.findOne({
                name: categories[i],
            }).exec((err, data) => {
                console.log("see cat data", data);
                if (err) return console.log("see cat error", error);
                ids.push(data._id)
            })
        }
          
        // save post 
        setTimeout(async () => {
            try {
                const post = await new Post({
                    ...req.body,
                    slug: slugify(title),
                    categories: ids,
                    postedBy: req.user._id,
                }).save()


                // push the post id to user's posts []
                await User.findByIdAndUpdate(req.user._id, {
                    $addToSet: {posts: post._id}
                })
                return res.json(post)


            } catch (error) {
                console.log(error);
            }
        }, 1000)
    } catch (error) {
         console.log(error);
    }
}

// export const posts = async (req, res) => {

//     try {
//         const all = await Post.find()
//             .populate("featuredImage")
//             .populate('postedBy', 'name')
//             .populate("categories", " name slug")
//             .sort({ createdAt: -1 })
//         res.json(all)
        
//     } catch (error) {
//         console.log(error);
//     }
// }
export const posts = async (req, res) => {

    

    try {
        const perPage = 6
        const page = req.params.page || 1
        const all = await Post.find()
        .skip((page - 1) * perPage)
            .populate("featuredImage")
            .populate('postedBy', 'name')
            .populate("categories", " name slug")
            .sort({ createdAt: -1 })
            .limit(perPage)
        res.json(all)
        
    } catch (error) {
        console.log(error);
    }
}
export const uploadImageFile = async (req, res) => {
    try {
        // console.log(req.files);
        const result = await cloudinary.uploader.upload(req.files.file.path)
    //    save to databse
    const media = await new Media ({
        url: result.secure_url,
        public_id: result.public_id,
        postedBy: req.user._id
    }).save()
    res.json(media)
    } catch (error) {
        console.log(error);
    }
}


export const media = async (req, res) => {
    try {
        const media = await Media.find()
        .populate('postedBy', "__id ")
        .sort({ createdAt: -1})
        res.json(media)
    } catch (error) {
        console.log(error);
    }
}

export const removeMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id)
        res.json({ ok: true})
    } catch (error) {
        console.log(error);
    }
}

export const singlePost = async (req, res) => {
    try {
        const { slug }  = req.params
        const { title, content, categories } = req.body
        const post = await Post.findOne({ slug })
        .populate("postedBy", "name")
        .populate("categories", "name slug")
        .populate("featuredImage", "url")
        // comments
        const comments = await Comment.find({ postId: post._id}).populate(
            "postedBy",
            "name"
        ).sort({ createdAt: -1})
        res.json({ post, comments })
        console.log('na me', post);
    } catch (error) {
        console.log(error);
    }
}

export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId)
        res.json({ ok: true})
    } catch (error) {
        
    }
}

export const editPost = async (req, res) => {
    try {
        const { postId } = req.params
        const { title, content, featuredImage, categories } = req.body
        let ids = []
        for (let i = 0; i < categories; i++) {
            Category.findOne({
                name: categories[i],
            }).exec((err, data) => {
                if (err) return console.log(error);
                ids.push(data._id)
            })
        }
        setTimeout(async () => {
            const post = await Post.findByIdAndUpdate(
                postId,
                 {
                title,
                 slug: slugify(title), 
                 content, 
                 categories: ids,
                 featuredImage },
                 {  new: true}
            ).populate("postedBy", "name")
             .populate("categories", "name slug")
             .populate("featuredImage", "url")
             res.json(post)
        }, 1000)

    } catch (error) {
        console.log(error);
    }
}

export const postsByAuthor = async (req, res) => {
    try {
        const posts = await Post.find({postedBy: req.user._id})
        .populate("postedBy", "name")
        .populate("categories", "name slug")
        .populate("featuredImage", "url")
        .sort({ createdAt: -1})
        res.json(posts)
    } catch (error) {
        
    }
}

export const postCount = async (req, res) => {
    try {
        const count = await Post.countDocuments()
        res.json(count)
    } catch (error) {
        console.log(error);
    }
}

export const postsForAdmin = async (req, res) => {
    try {
        const posts = await Post.find().select("title slug")
        res.json(posts)
    } catch (error) {
        
    }
}

export const createComment = async (req,res) => {
    try {
        const { postId } = req.params
        const { comment } = req.body
        let newComment = await new Comment({
            content: comment,
            postedBy: req.user._id,
             postId,

        }).save()
        newComment = await newComment.populate("postedBy", "name")
        res.json(newComment)
    } catch (error) {
        console.log(error);
    }
}

export const comments = async (req, res) => {
  try {
    const perPage = 6
    const page = req.params.page || 1

    const allComments = await Comment.find()
    .skip((page - 1) * perPage)
    .populate("postedBy", "name")
    .populate("postId", "title slug")
    .sort ({ createdAt: -1 })
    .limit(perPage)

    return res.json(allComments)
  } catch (error) {
    console.log(error);
  }
}

export const userComments = async (req, res) => {
    try {
      const comments = await Comment.find(
        { postedBy: req.user._id})
        .populate("postedBy", "name")
      .populate("postId", "title slug")
      .sort({ createdAt: -1})
      return res.json(comments)
    } catch (error) {
      console.log(error);
    }
  }
export const commentCount = async (req, res) => {
    try {
      const count = await Comment.countDocuments()
    } catch (error) {
      console.log(error);
    }
}
export const updateComment = async (req, res) => {
    try {
    const { commentId } = req.params
    const { content } = req.body
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true}
    )
    res.json(updatedComment)
    } catch (error) {
      console.log(error);
    }
}
export const removeComment = async (req, res) => {
    try {
       const comment = await Comment.findByIdAndDelete(req.params.commentId)
       res.json({ ok: true})
    } catch (error) {
      console.log(error);
    }
}

export const getNumbers = async (req, res) => {
    try {
        const posts = await Post.countDocuments()
        const users = await User.countDocuments()
        const comments = await Comment.countDocuments()
        const categories = await Category.countDocuments()

        return res.json({ posts, users, comments, categories})
    } catch (error) {
        console.log(error);
    }
}