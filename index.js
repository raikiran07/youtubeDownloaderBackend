// backend server for handling download request from the frontend

const express = require('express')
const ytdl = require('ytdl-core')
const cors = require('cors')



const port = process.env.PORT || 5001;

const app = express()
app.use(cors())

app.get("/download", async(req, res) => {
    try {
        const url = req.query.url;
        console.log(url)
        const videoId = await ytdl.getURLVideoID(url);
        const metaInfo = await ytdl.getInfo(url);

        let data = {
            url: "https://www.youtube.com/embed/" + videoId,
            info: metaInfo.formats
        }

        return res.send(data)
    } catch (error) {
        return res.status(500)
    }
})

app.get('/',(req,res)=>{
  res.send("server is live")
})

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`)
})

