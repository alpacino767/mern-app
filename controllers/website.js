import Website from "../models/website"

// sendgrid
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_KEY)



export const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body

        const emailData = {
        
                from: process.env.EMAIL_FROM,
                to: process.env.EMAIL_FROM,
                subject: "Email received from Contact form",
                html: `
                <h3>Contact from message<h3>
                <p><u>Name</u></p>
                <p>${name}</p>
                <p><u>Email</u></p>
                <p>${email}</p>
                <p><u>Message</u></p>
                <p>${message}</p>
                `
        }

        try {
            const data = await sgMail.send(emailData)
            res.json({ ok : true})
        } catch (error) {
            console.log(error);
            res.json({ ok : true})
            
        }

    } catch (error) {
        console.log(error);
    }
}

// homepage
export const createPage = async (req, res) => {
    try {
        const { page } = req.body
        const found = await Website.findOne({ page })

        if(found) {
    //    update
    const updated = await Website.findOneAndUpdate({ page }, req.body, {
        new: true
    })
    return res.json(updated)

        } else {
         const created = await new Website(req.body).save()
         return res.json(created)
        }
        
    } catch (error) {
        console.log(error);
    }
}



// getpage
export const getPage = async (req, res) => {
    try {
        const { page } = req.params
        const found = await Website.findOne({ page }).populate("fullWidthImage")
        return res.json(found)
    } catch (error) {
        console.log(error);
    }
}