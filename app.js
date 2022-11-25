const express = require("express");
const request = require("request");
const https = require("https");
//const bodyParser = require("body-parser");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"))

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/signup.html")
  }  );

  app.post("/",(req,res)=>{
    const  fname = req.body.fname;
    const ename = req.body.ename;
    const  email = req.body.email;

    var data = {
      members: [
        {
          email_address:email,
          status:"subscribed",
          merge_fields : {
            FNAME:fname,
            LNAME:ename
          }
        }
      ]
    }

    const jsonData  = JSON.stringify(data);
    const url = " https://us12.api.mailchimp.com/3.0//lists/35166dc265";
    const options = {
      method: "POST",
      auth:"dennis:977a9412bab53a117d071fbbdf1f5a8c-us12"
    }
    const request = https.request(url,options,(response)=>{
      if (response.statusCode === 200 ) {
        res.sendFile(__dirname+"/success.html");
      }  else {
        res.sendFile(__dirname+"/failure.html");
      }
      response.on("data",(data)=>{
      //  console.log(JSON.parse(data));
      });
    });

    request.write(jsonData);
    request.end();
    console.log(email)
  });

  app.post("/failure",function (reqa,resa){
    resa.redirect("/");
  });
  app.listen(process.env.PORT || 3000, () => {
    console.log("the server is started at port 3000");
    }); 


//     Mailchim api key
// Label : udemy
// Api key:  977a9412bab53a117d071fbbdf1f5a8c-us12
 //Audience - LIst ID.  Typically, this is what they want: 35166dc265.

//  const run = async () => {
//     const response = await client.lists.addListMember("list_id",
//         {
//             email_address: "Elinore.Grady9@gmail.com",
//             status: "pending",
//             merge_fields: {
//                 FNAME: "Elinore",
//                 LNAME: "Grady",
//                 BIRTHDAY: "01/22",
//                 ADDRESS: {
//                     addr1: "123 Freddie Ave",
//                     city: "Atlanta",
//                     state: "GA",
//                     zip: "12345",
//                 },
//             },
//         },
//         {
//             skipMergeValidation: false
//         }
//     );
// };


// run();
