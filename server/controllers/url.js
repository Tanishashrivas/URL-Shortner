import { nanoid } from "nanoid";
import ShortUrl from "../models/url.js";

const generateUrl = async (req, res) => {
    const { url } = req.body;
    const shortid = nanoid();

    // console.log(url);

    if(!url) return res.status(401).json({error: "url is required"});
  
    try {
      await ShortUrl.create({
        shortId: shortid,
        redirectUrl: url,
        visitHistory: [],
      });
  
      return res.status(201).json({id: shortid});
    } catch (error) {
      console.error("Error creating ShortUrl:", error);

      return res.status(500).json({ error: "An error occurred while saving the URL", details: error.message });
    }
}

const getRedirectedUrl = async(req, res) => {
  const { id } = req.params;
  const time = Date.now();

  try{
    const redirect = await ShortUrl.findOne({shortId: id});
    if (!redirect) {
      return res.status(404).json({ error: "URL not found" });
  }

 const result = await ShortUrl.updateOne(
  {shortId: id},
  {
    $push: {visitHistory: { timestamp : time } }
  }
 )

 if (result.nModified === 0) {
  throw new Error("Document not updated"); 
}

// console.log(`Successfully updated visit history for ShortUrl with id ${id}`);
  return res.json({redirect: redirect.redirectUrl});
  // return res.redirect(redirect.redirectUrl);
  }catch(error){
    console.error("Error fetching or updating URL:", error.message);
        return res.status(500).json({ error: "Error fetching or updating URL" });
  }
}

export default { generateUrl, getRedirectedUrl };