const port = 5000;
const bcrypt = require('bcrypt');
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({      // for generating e-mail
    service: 'gmail',
    auth: {
      user: 'uttheinfinite@gmail.com',
      pass: 'ruxidxgeautgwbbn'
    }
  });

var normal = []; //normal Queue array

var fast = []; // fast-track Queue array

var showf = [];     //fast-track grievances array

var shown = [];     //normal grievances array

function updatenormalQ()     //pushing pending complaints into normal queue
{
    MongoClient.connect(url, function (err, db) { 
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo
          .collection("Complaints")
          .find({ status: "pending" }, { projection: { _id: 1, date: 1 } })
          .toArray(function (err, result) {
            if (err) throw err;
      
              function compare(a,b)
              {
                  var d1=a.date.substr(0,2);
                  var d2=b.date.substr(0,2);
                  var m1=a.date.substr(3,2);
                  var m2=b.date.substr(3,2);
                  var y1=a.date.substr(6,4);
                  var y2=b.date.substr(6,4);
                  
                  var str1=y1+m1+d1;
                  var str2=y2+m2+d2;
      
      
                  if(str1 < str2)
                  {
                      return -1;
                  }
                  if(str1 > str2)
                  {
                      return 1;
                  }
                  return 0;
              }
      
              result.sort(compare);
      
      
              
          //   normal = result;
              for (let i = 0; i < result.length; i++) {

                if(fast.indexOf(result[i]._id)<0)
                normal.push(result[i]._id);
           }
      
           for (let i = 0; i < normal.length; i++) {
              console.log(normal[i]);
            }
      
            console.log(
              "Successfully inserted pending complaints into normal queue."
            );
            db.close();
          });
      });
}

function updatefastQ()         //pushing fast-tracked complaints into fast-track queue
{
    MongoClient.connect(url, function (err, db) {   
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo
          .collection("fast_track")
          .find({}, { projection: { guid: 1, date: 1 } })
          .toArray(function (err, result) {
            if (err) throw err;
      
              function compare(a,b)
              {
                  var d1=a.date.substr(0,2);
                  var d2=b.date.substr(0,2);
                  var m1=a.date.substr(3,2);
                  var m2=b.date.substr(3,2);
                  var y1=a.date.substr(6,4);
                  var y2=b.date.substr(6,4);
                  
                  var str1=y1+m1+d1;
                  var str2=y2+m2+d2;
      
      
                  if(str1 < str2)
                  {
                      return -1;
                  }
                  if(str1 > str2)
                  {
                      return 1;
                  }
                  return 0;
              }
      
              result.sort(compare);
      
      
              
          //   normal = result;
              for (let i = 0; i < result.length; i++) {
              fast.push(result[i].guid);
           }
      
           for (let i = 0; i < fast.length; i++) {
              console.log(fast[i]);
            }
      
            console.log(
              "Successfully inserted fast-tracked pending complaints into fast-track queue."
            );
            db.close();
          });
      });


}

updatefastQ();
updatenormalQ();
setTimeout(show_normal,200);
setTimeout(show_fast,210);
var timeout = setTimeout(delcross,500);
setInterval(delcross, 1000*60*60*24+500); // called after every 24 hours to keep track of deadline crossed grievances


function addGrievance(gtitle, gdesc,iid,deptx) {  // for filing grievances
    const today = new Date();
        const yyyy = today.getFullYear();
  
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
  
        
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        
        var date = dd + "/" + mm + "/" + yyyy;

        
            var uid = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 6; i++ ) {
              uid += characters.charAt(Math.floor(Math.random() * 
         charactersLength));
           }
           
        

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("GRS_DB");
      var myobj = {
        _id: uid,
        title: gtitle,
        desc: gdesc,
        date: date,
        iid: iid,
        status: "pending",
        dept : deptx
      };
      dbo.collection("Complaints").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 complaint registered.");
        db.close();
      });
    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo.collection("HEIs").findOne({_id : iid}, function(err, resx) {
            if (err) throw err;
            var mailOptions = {
                from: 'uttheinfinite@gmail.com',
                to: resx.email,
                subject: 'Grievance Registered',
                text: 'Your grievance status is pending. Problem id:'+uid+' .'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            db.close();
          });
    });



    normal.push(uid);
}

function withdraw(uid) {    // for withdrawing pending grievances
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  var ind = normal.indexOf(uid);
  if (ind > -1) {
    // only splice array when item is found
    normal.splice(ind, 1); // 2nd parameter means remove one item only
  }

  ind = fast.indexOf(uid);
  if (ind > -1) {
    // only splice array when item is found
    fast.splice(ind, 1); // 2nd parameter means remove one item only
  }

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("GRS_DB");
    dbo.collection("Complaints").findOne({ _id: uid, status : "pending" }, function (err, obj) {
      if (err) throw err;
      
      if(obj==null)
      console.log("Invalid withdraw request.");
      else
      {
        console.log("1 complaint withdrawn.");
        temp(obj.iid);
      }
      db.close();
    });
  });

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("GRS_DB");
    var myquery = { _id: uid, status : "pending" };
    dbo.collection("Complaints").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 complaint withdrawn.");
      db.close();
    });
  });

  function temp(iid)
  {
    console.log("lol");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
    var dbo = db.db("GRS_DB");
        dbo.collection("HEIs").findOne({_id : iid}, function(err, resx) {
            if (err) throw err;
            var mailOptions = {
                from: 'uttheinfinite@gmail.com',
                to: resx.email,
                subject: 'Grievance Withdrawn',
                text: 'Your grievance was withdrawn successfully. Problem id:'+uid+' .'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            db.close();
          });
    });
  }
  


  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("GRS_DB");
    var myquery = { guid: uid};
    dbo.collection("fast_track").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 complaint withdrawn.");
      db.close();
    });
  });

  

}

function fast_track(uid, newdate) {     // for urgent pushing deadline crossed grievancess
  if (normal.includes(uid) == false) {
    console.log("Invalid fast-track request");
  } else {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("GRS_DB");
      dbo
        .collection("Complaints")
        .findOne({ _id: uid }, function (err, result) {
          if (err) throw err;
          var date = result.date;
          const today = new Date();
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1; // Months start at 0!
          let dd = today.getDate();

          if (dd < 10) dd = "0" + dd;
          if (mm < 10) mm = "0" + mm;

          var cdate = dd + "/" + mm + "/" + yyyy;

          var Difference_In_Time = cdate.getTime() - date.getTime();

          // To calculate the no. of days between two dates
          var diff = Difference_In_Time / (1000 * 3600 * 24);

          if (diff > 10) {

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("GRS_DB");
                var myobj = { guid: uid, date: newdate };
                dbo.collection("fast_track").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 complaint inserted into fast-track.");
                  db.close();
                });
              });

            fast.push(uid);
            console.log("Pushed to fast-track queue successfully.");
          } else {
            console.log(
              "Invalid fast-track request as deadline not crossed yet"
            );
          }
          db.close();
        });
    });
  }
}

function display_status(uid) {    // for displaying grievances
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("GRS_DB");
    dbo.collection("Complaints").findOne({ _id: uid }, function (err, result) {
      if (err) throw err;
      console.log(result.status); // generate response
      db.close();
    });
  });
}

function delcross() {   // whenever the server starts, it should be executed first and should be re run after every 24 hrs
  for (let i = 0; i < normal.length; i++) {
    var uid = normal[i];
    actualdel(uid);
  }
  console.log("Complaints with deadline crossed for more than 5 days and not fast-tracked were deleted.");
}

function actualdel(uid)  //// will be executed after every 24 hrs
{
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo
          .collection("Complaints")
          .findOne({ _id: uid }, function (err, result) {
            if (err) throw err;
            var date = result.date;
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
  
            if (dd < 10) dd = "0" + dd;
            if (mm < 10) mm = "0" + mm;
  
            var cdate = dd + "/" + mm + "/" + yyyy;
  
            console.log(cdate+" "+date);
              

              var dateParts1 = cdate.split("/");
              const currdate = new Date(+dateParts1[2], dateParts1[1] - 1, +dateParts1[0]); 

              var dateParts2 = date.split("/");
              const regdate = new Date(+dateParts2[2], dateParts2[1] - 1, +dateParts2[0]); 
  
              console.log(currdate.getTime()+" "+regdate.getTime());
            var Difference_In_Time = currdate.getTime() - regdate.getTime(); //error
  
            // To calculate the no. of days between two dates
            var diff = Difference_In_Time / (1000 * 3600 * 24);
              

            if (diff > 15) {
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("GRS_DB");
                var myquery = { _id: uid };
                dbo
                  .collection("Complaints")
                  .deleteOne(myquery, function (err, obj) {
                    if (err) throw err;
                    console.log("1 document deleted");
                    db.close();
                  });
              });
            }
  
            db.close();
          });
      });
}

function app_normal(eid,curr)   // 5 points increased
{


    var myquery = { _id: curr };

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            
            var newvalues = { $set: { status : "in_process" } };

            dbo.collection("Complaints").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 normal queue complaint approved.");
              db.close();
            });
        });

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            var req;
            dbo.collection("Complaints").findOne(myquery, function(err, res) {
                if (err) throw err;
                tmp(res.iid);
                db.close();
              });
            });
              
              function tmp(req)
              {

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
            var dbo = db.db("GRS_DB");
                    dbo.collection("HEIs").findOne({_id : req}, function(err, resx) {
                        if (err) throw err;
                        var mailOptions = {
                            from: 'uttheinfinite@gmail.com',
                            to: resx.email,
                            subject: 'Grievance Approved',
                            text: 'Your grievance status is in-process. Problem id:'+curr+' .'
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                        db.close();
                      });
                });

                
              }

              MongoClient.connect(url, function(err, db) {
              if (err) throw err;
            var dbo = db.db("GRS_DB");
            var myquery2 = { _id: eid };
            var newvalues2 = { $inc: { points: 5 } };

            dbo.collection("RA_emp").updateOne(myquery2, newvalues2, function(err, res) {
                if (err) throw err;
                console.log("RA emp points increased by 5.");
                db.close();
            });
        });
              

          



}


function app_fast(eid)   // 2 points increased
{
        var curr=fast.shift();
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            var myquery = { _id: curr };
            var newvalues = { $set: { status : "in_process" } };
            dbo.collection("Complaints").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 fast queue complaint approved.");
              db.close();
            });

             var myquery2= { guid: curr};
            dbo.collection("fast_track").deleteOne(myquery2, function(err, obj) {
                if (err) throw err;
                console.log("1 fast Q complaint deleted from fast-track DB.");
                db.close();
            });

        });


        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            var myquery3 = { _id: eid };
            var newvalues3 = { $inc: { points: 2 } };

            dbo.collection("RA_emp").updateOne(myquery3, newvalues3, function(err, res) {
                if (err) throw err;
                console.log("RA emp points increased by 2.");
                db.close();
            });

        });
          
}

function rej_normal()   // reject normal queued grievances
{
    var curr=normal.shift();
    console.log(curr);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        var myquery = { _id : curr };
        dbo.collection("Complaints").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 normal Q complaint deleted from DB.");
        db.close();
    });
      });
}

function rej_fast()   // reject fast-tracked grievances
{
    var curr=fast.shift();
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            var myquery = { _id: curr };
            dbo.collection("Complaints").deleteOne(myquery, function(err, obj) {
                if (err) throw err;
                console.log("1 fast Q complaint deleted from complaints DB.");
                db.close();
            });
            myquery2= { guid: curr};
            dbo.collection("fast_track").deleteOne(myquery2, function(err, obj) {
                if (err) throw err;
                console.log("1 fast Q complaint deleted from fast-track DB.");
                db.close();
            });
          });
}


function addHEI(iid, namex, emailx, contactx, addx, passx)  // for registering HEIs
{

    const saltRounds = 10;  
    const myPass = passx;
    bcrypt.hash(myPass,saltRounds,function(er,hash){
        if(er) throw er;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            var myobj = {
                _id: iid,
                name: namex,
                email: emailx,
                contact: contactx,
                add: addx,
                pass: hash
              };
            dbo.collection("HEIs").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("1 HEI registered.");
              db.close();
            });
          });
    });
}

// for demo:
// addHEI("XA23BC","Rajat","rajat@gmail.com","9898674571","agra","random");
// addHEI("YC14OA","Kaushal","kaushal@gmail.com","6145875423","nashik","sample");
// addHEI("XY12AB","Utkarsh","netizen.utkars@gmail.com","6396177242","nagpur","easypeasy");

function finishup(uid)     // in-process -> completed  (resolve it completely)
{

    var temp;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo.collection("Complaints").findOne({_id : uid}, function(err, result) {
          if (err) throw err;
          temp=result.status;
          db.close();
        });
      });

      if(temp=="in_process")
      {
            MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            var myquery = { _id: uid };
            var newvalues = { $set: { status : "completed" } };
            dbo.collection("Complaints").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 complaint completed.");
                db.close();
                });
            });
      }
      else
      {
        console.log("Invalid completion request.");
      }

    
}

function addRA(eidx, namex, deptx,emailx, passx) // registering Regulatory Authorities
{
    const saltRounds = 10;  
    const myPass = passx;
    bcrypt.hash(myPass,saltRounds,function(er,hash){
        if(er) throw er;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            var myobj = {
                "_id": eidx,
                "name": namex,
                "dept": deptx,
                "points": 0,
                "email": emailx,
                "pass": hash
              };
            dbo.collection("RA_emp").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("1 RA registered.");
              db.close();
            });
          });
    });
}

async function login_hei(iid,pass)  // HEI authentication
{
        var reqh;
        var ans=false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo.collection("HEIs").findOne({_id : iid}).then(user=>{
            if(!user) reqh=null;
            else reqh=user.pass;
            });
        });
      
        
         setTimeout(func,500);
        // func();


         function func()
         {
            if(reqh!=null)
            ans=bcrypt.compareSync(pass,reqh);
         }

         await new Promise(r => setTimeout(r, 1000));

         return ans;
        
}


async function login_ra(eid,pass)   // RA authentication
{
    var reqh;
        var ans=false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo.collection("RA_emp").findOne({_id : eid}).then(user=>{
            if(!user) reqh=null;
            else reqh=user.pass;
            });
        });
      
        
         setTimeout(func,500);
        // func();


         function func()
         {
            if(reqh!=null)
            ans=bcrypt.compareSync(pass,reqh);
         }

         await new Promise(r => setTimeout(r, 1000));

         return ans;
}


function show_normal()   // storing details of normal grievances
{
    for(let i=0;i<normal.length;i++)
    {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            dbo.collection("Complaints").findOne({_id : normal[i]}, function(err, result) {
              if (err) throw err;
              shown.push(result);
              db.close();
            });
          });
    }
}


function show_fast()   // storing details of fast-tracked grievances
{
    for(let i=0;i<fast.length;i++)
    {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            dbo.collection("Complaints").findOne({_id : fast[i]}, function(err, result) {
              if (err) throw err;
              showf.push(result);
              db.close();
            });
          });
    }
}

async function show_points(dptx){   // display department points
    var sum=0;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo.collection("RA_emp").find({ dept : dptx}).toArray(function(err, result) {
          if (err) throw err;
          for(let i=0;i<result.length;i++){
            sum=sum+result[i].points;
          }
          db.close();
        });
    });
          
          await new Promise(r => setTimeout(r, 200));
          return sum;
        
}


async function emp_pts(eid)   // display employee's individual points
{
    var pts=0;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("GRS_DB");
        dbo.collection("RA_emp").findOne({_id : eid}, function(err, result) {
          if (err) throw err;
          pts= result.points;
          db.close();
        });
      });
      await new Promise(r => setTimeout(r, 200));
          return pts;

}


async function hei_list(id){  // lists all grievances ever filed by that HEI
    
    var a=[];
    var b=[];
    for(let i=0;i<normal.length;i++)
    {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            dbo.collection("Complaints").findOne({_id : normal[i]}, function(err, result) {
              if (err) throw err;
              if(!(result==null))
              {
                if(result.iid==id)
                a.push(result);
              }
              
              db.close();
            });
          });
    }
    for(let i=0;i<fast.length;i++)
    {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("GRS_DB");
            dbo.collection("Complaints").findOne({_id : fast[i]}, function(err, result) {
              if (err) throw err;
              if(!(result==null))
              {
                if(result.iid==id)
                b.push(result);
              }
              db.close();
            });
          });
    }

    await new Promise(r => setTimeout(r, 1000));

    var obj = {first : a, second : b};
    return obj;
    
}

app.get("/", (req,res)=>{
  session=req.session;
  if(session.userid){
    res.send("Initialised sessions");
  }
});

app.post("/registerRA", (req,res)=>{
  const { UID, name, dept, email, add, contact, pass } = req.body;
  addRA(UID, name, dept, contact, add, email, pass);
  res.send("Registration successful");
});

app.post("/registerHEI", (req,res)=>{
  const { UID, name, email, contact, add, pass} = req.body;
  addHEI(UID, name, email, contact, add, pass);
  res.send("Registration successful");
});

app.post("/loginHEI", (req, res)=>{
  let { id, pass } = req.body;
    login_hei(id, pass).then((response)=>{
      glo=id;
      res.send(response);
    })
});
app.post("/loginRA", (req, res)=>{
  let { id, pass } = req.body;
    login_ra(id, pass).then((response)=>{
      glo=id;
      res.send(response);
    })
});

app.get("/fetchList", (req,res)=>{
  console.log(glo);
  hei_list(glo)
  .then((response)=>{
    console.log(glo);
    console.log(response);
    res.send(response);
  })
});

//gtitle, gdesc,iid, sid, path1, path2, path3
app.post("/addGrievance", (req,res)=>{
  const { IID ,title, des, department } = req.body;
  addGrievance(title, des, IID);
  res.send("Submitted Successfully");
});

app.post("/withdrawGrievance", (req,res)=>{
  withdraw(req.body.UID);
  res.send("Successfully deleted grievance ID" + req.body.UID);
});

app.post("/individual", (req, res)=>{
  emp_pts(glo).then((response)=>{
    res.send(response.data);
    console.log("Points Send!");
  })
});

app.post("/display",(req,res)=>{
  const { id } = req.body;
  console.log(req);
  console.log(id)
  const response = display_status(id);
  console.log(response);
  res.send(response);
});

app.listen(8000, ()=>{
  console.log("Server started at port 8000");
})


