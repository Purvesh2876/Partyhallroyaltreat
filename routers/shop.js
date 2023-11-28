const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { User } = require("../models/user");

const mongoose = require("mongoose");
const multer = require("multer");
const { Product } = require("../models/product");
const { Sub } = require("../models/sub");
const { subCategory } = require("../models/subcategory");
const { Category } = require("../models/category");
const {Heading} = require ("../models/heading");
const {Review} = require ("../models/review");
var nodemailer = require('nodemailer');

const apiKey = process.env.API_KEY;


router.get(`/`, async (req, res) => {
	// const product = await Product.find().limit(8);
	const category = await Category.find();
	const sub = await Sub.find();
	const heading = await Heading.find();
	const review = await Review.find();
	const popular = await Category.find({ tag: 'popular' });
	const wedding = await Category.find({ tag: 'wedding' });
	const top = await Category.find({ tag: 'top attraction' });Category
	
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerwedding = await Category.find({ tag: 'wedding' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
    // const subcategory = await subCategory.find().select("name");
	res.render("home", {
		// product: product,
        // subcategory: subcategory,
		activePage: 'home',
		footerpopular:footerpopular,
		footertopattr:footertopattr,
		sub: sub,
		category: category,
		heading: heading,
		review: review,
		popular:popular,
		top:top,
		sessionId: req.session._id,
		anAdmin: req.session.anAdmin,
		
	});
});


router.get("/alltours",  async (req, res) => {
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerwedding = await Category.find({ tag: 'wedding' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
	res.render("alltours", {
		activePage: 'alltours',
		category: category,
		footerpopular:footerpopular,
		footerwedding:footerwedding,
		footertopattr:footertopattr,
		
	});
});

router.get("/gallery",  async (req, res) => {
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerwedding = await Category.find({ tag: 'wedding' }).limit(5);
	const footerbirthday = await Category.find({ tag: 'birthday' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
	res.render("gallery", {
		activePage: 'gallery',
		category: category,
		footerpopular:footerpopular,
		footerwedding:footerwedding,
		footerbirthday:footerbirthday,
		footertopattr:footertopattr,
		
	});
});

router.get("/facilities",  async (req, res) => {
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerwedding = await Category.find({ tag: 'wedding' }).limit(5);
	const footerbirthday = await Category.find({ tag: 'birthday' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
	res.render("facilities", {
		activePage: 'facilities',
		category: category,
		footerpopular:footerpopular,
		footerwedding:footerwedding,
		footerbirthday:footerbirthday,
		footertopattr:footertopattr,
		
	});
});

router.get("/partyhall",  async (req, res) => {
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerwedding = await Category.find({ tag: 'wedding' }).limit(5);
	const footerbirthday = await Category.find({ tag: 'birthday' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
	res.render("partyhall", {
		activePage: 'partyhall',
		category: category,
		footerpopular:footerpopular,
		footerwedding:footerwedding,
		footerbirthday:footerbirthday,
		footertopattr:footertopattr,
	});
});

router.get("/services",  async (req, res) => {
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerwedding = await Category.find({ tag: 'wedding' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
	res.render("services", {
		activePage: 'services',
		category: category,
		footerpopular:footerpopular,
		footerwedding:footerwedding,
		footertopattr:footertopattr,
		
	});
});

router.get("/popular",  async (req, res) => {
	const popular = await Category.find({ tag: 'popular' });
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
	res.render("popular", {
		activePage: 'popular',
		popular: popular,
		footerpopular:footerpopular,
		footertopattr:footertopattr,

	});
});


router.get("/about", async(req, res)=>{
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
	res.render("about",{
		activePage:'about',
		footerpopular:footerpopular,
		footertopattr:footertopattr,
	});
}); 


router.get("/ticket",  async (req, res) => {
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);
	res.render("ticket", {
		activePage:'ticket',
		footerpopular:footerpopular,
		footertopattr:footertopattr,
	});
});
router.post("/ticket", (req,res)=>{
	var mailContent = {
		name: req.body.name,
		email: req.body.email,
		cfrom:req.body.cfrom,
		cto:req.body.cto,
		dfrom:req.body.dfrom,
		dto:req.body.dto,
		adult: req.body.adult,
		youth: req.body.youth,
		child: req.body.child,
		message:req.body.message,
		phone: req.body.phone,
		
	}
  
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: 'rahulvadhiya.vmukti@gmail.com',
		  pass: 'iyvdfpozoxpdkmdp',
		}
	});
	var mailOptions = {
		from: mailContent.email,
		to: 'j.gtravels@yahoo.com',
		subject: "Ticket Booking Enquiry",
		// subject: "mailContent.subject",
		text:  
		"Ticket Booking Enquiry \n" +
		"\n Name :" +mailContent.name+
		 "\n Message :"+mailContent.message  + 
		  "\n Email id : " + mailContent.email + 
		  "\n Phone no : " + mailContent.phone +
		  "\n country :"+`from  ${mailContent.cfrom}  to ${mailContent.cto}` +
		  "\n Date :"+`from  ${mailContent.dfrom}  to ${mailContent.dto}` +
		  "\n Passanger Details :"+ "\n Adult Members: " + mailContent.adult  +  "\n Youth Members: " + mailContent.youth  +  "\n Child Members: " + mailContent.child 
		
	  };
  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.redirect("/ticket");
		}
	  });  
  
	  transporter.close();
	  
  });



router.get(`/contact`, async (req, res) => {
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footertopattr = await Category.find({ tag: 'top attraction' }).limit(5);

	res.render("contact", {
	activePage:'contact',
		sessionId: req.session._id,
		anAdmin: req.session.anAdmin,
		footerpopular:footerpopular,
		footertopattr:footertopattr,
		// logocategory: logocategory,
	});
});

router.post("/contact", (req,res)=>{
	var mailContent = {
		name: req.body.name,
		email: req.body.email,
		message:req.body.message,
		phone: req.body.phone,
		
	}
  
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: 'info.royaltreat01@gmail.com',
		  pass: 'iyvdfpozoxpdkmdp',
		}
	});
	var mailOptions = {
		from: mailContent.email,
		to: 'info.royaltreat01@gmail.com',
		subject: "Contact Us Message",
		// subject: "mailContent.subject",
		text:  "Contact Us Message \n" +
		"\n Name :" + mailContent.name +
		 "\n Message :"+mailContent.message  + 
		  "\n Email id: " + mailContent.email + 
		  "\n Phone no: " + mailContent.phone 
		
	  };
  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.redirect("/contact");
		}
	  });  
  
	  transporter.close();
	  
  });
  

router.post("/sendenquiry", (req,res)=>{
	var mailContent = {
		name: req.body.name,
		email: req.body.email,
		// subject: req.body.subject,
		date: req.body.date,
		phone: req.body.phone,
		adult: req.body.adult,
		youth: req.body.youth,
		child: req.body.child,
	}
  
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: 'rahulvadhiya.vmukti@gmail.com',
		  pass: 'fiqhppdmwzegrtlr',
		}
	});
  
	var mailOptions = {
		from: mailContent.email,
		to: 'j.gtravels@yahoo.com',
		subject: 'Tour Enquiry',
		// subject: "mailContent.subject",
		text:  "Tour Enquiry \n"+
		"\n Name :"+mailContent.name  + 
		 "\n Enquiry For Mention Date :"+mailContent.date  + 
		  "\n Email id: " + mailContent.email + 
		  "\n Phone no: " + mailContent.phone 
		+  "\n Adult Members: " + mailContent.adult  +  "\n Youth Members: " + mailContent.youth  +  "\n Child Members: " + mailContent.child 
	  };
  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.redirect("/");
		}
	  });  
  
	  transporter.close();
	  
  });
  





module.exports = router;
