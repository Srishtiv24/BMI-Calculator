require("dotenv").config();

const express=require("express");
const app=express();
const path=require("path");

app.use(express.static(path.join(__dirname,"public")));//serve static files
app.use(express.json());//to read post body json

app.get("/", (req, res) => {
  res.redirect("/bmiCalc");
});

app.get("/bmiCalc",(req,res)=>
    res.sendFile(path.join(__dirname, "views", "bmiCalc.html"))
);

app.post("/ai/feedback",async (req,res)=>{
const promptText=req.body.text;
const url =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`;
const payload = {
  contents: [
    { parts: [{ text: promptText }] }
  ]
};

const response = await fetch(url,{
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});

if(!response.ok)//response.ok is true for 2xx
{ const err=await response.text();
  console.log("error in feedback ai ",err);//see detailed error reasons here (invalid key, quota exceeded, malformed payload). This prevents silent failures.
  return;
}

const data=await response.json();
console.log("data=",data);

//Gemini returns an array of candidates; you grab the first candidate’s first part’s text
const aiReply=data?.candidates?.[0]?.content?.parts?.[0]?.text || "No Response";
console.log("aiReply=",aiReply);

res.json({reply:aiReply});

})

app.listen(8080, () => {
  console.log("App is listening at port 8080");
});
