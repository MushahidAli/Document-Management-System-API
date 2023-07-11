const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

mongoose.connect(process.env.mongoDbString);
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) { console.log("connection succeeded"); })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(express.json());


//SIGNIN
app.get('/sign_in/:email/:password', async function (req, res) {

   var answer = await db.collection('dms_logon_collection').findOne({ email: req.params['email'], password: req.params['password'] }, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.json({ auth: 'success' });
   }
   else {
      res.json({ auth: 'failure' });
   }
   res.end();

})

//CREATE-DEPARTMENT
app.get('/create_dept/:deptname/:depthead/:date', function (req, res) {

   var deptname = req.params.deptname;
   var depthead = req.params.depthead;
   var date = req.params.date;

   var data = {
      deptname, depthead, date
   }

   db.collection('dms_department_collection').insertOne(data, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully : " + collection);
   });
   res.end();
})

//VIEW-DEPARTMENT
app.get('/view_dept/:limit', async function (req, res) {

   var answer = await db.collection('dms_department_collection').find({}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   }).sort({ _id: -1 }).limit(parseInt(req.params['limit'])).toArray();
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//NUMBER-OF-ALL-DEPT
app.get('/numberofalldept/', async function (req, res) {

   var answer = await db.collection('dms_department_collection').countDocuments({}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.json({ posts: answer })
   }
   else {
      res.json({ posts: 0 });
   }
   res.end();

})

//DELETE-DEPARTMENT
app.get('/delete_dept/:id', async function (req, res) {

   var ObjectId = require('mongodb').ObjectId;
   const id = req.params.id;
   const convertedObjectId = new ObjectId(id);
   var answer = await db.collection('dms_department_collection').deleteOne({ _id: convertedObjectId }, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//UPDATE-DEPARTMENT
app.get('/update_dept/:id/:deptname/:depthead', async function (req, res) {

   var ObjectId = require('mongodb').ObjectId;
   const id = req.params.id;
   const convertedObjectId = new ObjectId(id);
   var answer = await db.collection('dms_department_collection').updateOne({ _id: convertedObjectId }, {$set: {deptname: req.params.deptname, depthead: req.params.depthead}}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//CREATE-DESIGNATION
app.get('/create_designation/:designationname/:date', function (req, res) {

   var designationname = req.params.designationname;
   var date = req.params.date;

   var data = {
      designationname, date
   }

   db.collection('dms_designation_collection').insertOne(data, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully : " + collection);
   });
   res.end();
})

//VIEW-DESIGNATION
app.get('/view_designation/:limit', async function (req, res) {

   var answer = await db.collection('dms_designation_collection').find({}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   }).sort({ _id: -1 }).limit(parseInt(req.params['limit'])).toArray();
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//NUMBER-OF-ALL-DESIGNATION
app.get('/numberofalldesignation/', async function (req, res) {

   var answer = await db.collection('dms_designation_collection').countDocuments({}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.json({ posts: answer })
   }
   else {
      res.json({ posts: 0 });
   }
   res.end();

})

//DELETE-DESIGNATION
app.get('/delete_designation/:id', async function (req, res) {

   var ObjectId = require('mongodb').ObjectId;
   const id = req.params.id;
   const convertedObjectId = new ObjectId(id);
   var answer = await db.collection('dms_designation_collection').deleteOne({ _id: convertedObjectId }, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//UPDATE-DESIGNATION
app.get('/update_designation/:id/:designationname', async function (req, res) {

   var ObjectId = require('mongodb').ObjectId;
   const id = req.params.id;
   const convertedObjectId = new ObjectId(id);
   var answer = await db.collection('dms_designation_collection').updateOne({ _id: convertedObjectId }, {$set: {designationname: req.params.designationname}}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//CREATE-DOCUMENT-CATEGORY
app.get('/create_documentcategory/:categoryname/:description/:date', function (req, res) {

   var categoryname = req.params.categoryname;
   var description = req.params.description;
   var date = req.params.date;

   var data = {
      categoryname, description, date
   }

   db.collection('dms_documentcategory_collection').insertOne(data, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully : " + collection);
   });
   res.end();
})

//VIEW-DOCUMENT-CATEGORY
app.get('/view_documentcategory/:limit', async function (req, res) {

   var answer = await db.collection('dms_documentcategory_collection').find({}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   }).sort({ _id: -1 }).limit(parseInt(req.params['limit'])).toArray();
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//NUMBER-OF-ALL-DOCUMENT-CATEGORY
app.get('/numberofalldocumentcategory/', async function (req, res) {

   var answer = await db.collection('dms_documentcategory_collection').countDocuments({}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.json({ posts: answer })
   }
   else {
      res.json({ posts: 0 });
   }
   res.end();

})

//DELETE-DOCUMENT-CATEGORY
app.get('/delete_documentcategory/:id', async function (req, res) {

   var ObjectId = require('mongodb').ObjectId;
   const id = req.params.id;
   const convertedObjectId = new ObjectId(id);
   var answer = await db.collection('dms_documentcategory_collection').deleteOne({ _id: convertedObjectId }, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//UPDATE-DOCUMENT-CATEGORY
app.get('/update_documentcategory/:id/:categoryname/:description', async function (req, res) {

   var ObjectId = require('mongodb').ObjectId;
   const id = req.params.id;
   const convertedObjectId = new ObjectId(id);
   var answer = await db.collection('dms_documentcategory_collection').updateOne({ _id: convertedObjectId }, {$set: {categoryname: req.params.categoryname, description: req.params.description}}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//CREATE-EMPLOYEE
app.get('/create_employee/:employeeid/:employeename/:contactnumber/:emailaddress/:department/:designation/:address/:username/:password/:assigngroup/:date', function (req, res) {

   var employeeid = req.params.employeeid;
   var employeename = req.params.employeename;
   var contactnumber = req.params.contactnumber;
   var emailaddress = req.params.emailaddress;
   var department = req.params.department;
   var designation = req.params.designation;
   var address = req.params.address;
   var username = req.params.username;
   var password = req.params.password;
   var assigngroup = req.params.assigngroup;
   var date = req.params.date;

   var data = {
      employeeid, employeename, contactnumber, emailaddress, department, designation, address, username, password, assigngroup, date
   }

   db.collection('dms_employee_collection').insertOne(data, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully : " + collection);
   });
   res.end();
})

//VIEW-EMPLOYEE
app.get('/view_employee/:limit', async function (req, res) {

   var answer = await db.collection('dms_employee_collection').find({}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   }).sort({ _id: -1 }).limit(parseInt(req.params['limit'])).toArray();
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//NUMBER-OF-ALL-EMPLOYEE
app.get('/numberofallemployee/', async function (req, res) {

   var answer = await db.collection('dms_employee_collection').countDocuments({}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.json({ posts: answer })
   }
   else {
      res.json({ posts: 0 });
   }
   res.end();

})

//DELETE-EMPLOYEE
app.get('/delete_employee/:id', async function (req, res) {

   var ObjectId = require('mongodb').ObjectId;
   const id = req.params.id;
   const convertedObjectId = new ObjectId(id);
   var answer = await db.collection('dms_employee_collection').deleteOne({ _id: convertedObjectId }, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//UPDATE-EMPLOYEE
app.get('/update_employee/:id/:employeeid/:employeename/:department/:designation', async function (req, res) {

   var ObjectId = require('mongodb').ObjectId;
   const id = req.params.id;
   const convertedObjectId = new ObjectId(id);
   var answer = await db.collection('dms_employee_collection').updateOne({ _id: convertedObjectId }, {$set: {employeeid: req.params.employeeid, employeename: req.params.employeename, department: req.params.department, designation: req.params.designation}}, function (err, collection) {
      if (err) throw err;
      console.log(collection)
      return collection;
   });
   if (answer) {
      res.send(answer);
   }
   res.end();

})

//CREATE-REMOVE-REASON
app.get('/create_removereason/:removereason', function (req, res) {

   var removereason = req.params.removereason;

   var data = {
      removereason
   }

   db.collection('dms_removereason_collection').insertOne(data, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully : " + collection);
   });
   res.end();
})

app.listen(process.env.PORT || 3000);