const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../build/auth');
const path = require('path');
const { Category } = require("../models/category");
const { subCategory } = require("../models/subcategory");
const { Product } = require("../models/product");
const {Heading} = require("../models/heading");
const {Review} = require("../models/review");

const { User } = require("../models/user");
const { Contact } = require("../models/contact");

const mongoose = require("mongoose");
const multer = require("multer");
const isAuth = require("../build/is-auth");
const fileHelper = require("../build/file");
const fs = require("fs");


const fileTypeMap = {
	"image/png": "png",
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
};


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const isValid = fileTypeMap[file.mimetype];
		let uploadError = new Error("Invalid image type");

		if (isValid) {
			uploadError = null;
		}
		cb(uploadError, "public/uploads");
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname.replaceAll(" ", "-").split(".");
		fileName.pop();
		const extension = fileTypeMap[file.mimetype];
		cb(null, `${fileName}-${Date.now()}.${extension}`);
	},
});

const upload = multer({ 
	storage: storage,
 });



router.get(`/dashboard`, ensureAuthenticated, async(req, res) => {
	// const order = await Order.countDocuments();
	const product = await Product.countDocuments();
	const category = await Category.countDocuments();
	const subcategory = await subCategory.countDocuments();
	// const user = await User.countDocuments();
	const contact = await Contact.countDocuments();
	
	res.render("admin/index", {
		// orders: order,
		product: product,
		category: category,
		subcategory: subcategory,
		user: req.user,
		contact: contact,
	});
});





router.get(`/category`, ensureAuthenticated,  async (req, res) => {
	const category = await Category.find();
	
	res.render("admin/category", {
		category: category,
		user: req.user,
	});
});

router.get(`/review`, ensureAuthenticated,  async (req, res) => {
	const review = await Review.find();
	
	res.render("admin/review", {
		review: review,
		user: req.user,
	});
});

router.get(`/addcategory`, ensureAuthenticated, async (req, res) => {

	res.render("admin/addcategory", {
		user: req.user,
	});
});

router.get(`/addreview`, ensureAuthenticated, async (req, res) => {

	res.render("admin/addreview", {
		user: req.user,
	});
});


router.post(`/addcategory`, upload.single("image"),ensureAuthenticated, async (req, res) => {
	const fileName = req.file.filename;
	const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
	
	let category = new Category({
		country: req.body.country,
		name: req.body.name,
		tag:req.body.tag,
		image: `${basePath}${fileName}`,
		price: req.body.price,
		
	});

	category = await category.save();

	if (!category)
		res.status(500).send("This category was not sent to database...");

	res.redirect("/admin/category");
});

router.post(`/addheading`, ensureAuthenticated, async (req, res) => {
	let heading = new Heading({
		name: req.body.name	
		
	});
	heading = await heading.save();

	if (!heading)
		res.status(500).send("This heading was not sent to database...");

	res.redirect("/admin/addheading");
});

router.post(`/addreview`, ensureAuthenticated, async (req, res) => {
	let review = new Review({
		cname: req.body.cname	,
		review: req.body.review	,
		clocation: req.body.clocation,	
		
	});

	review = await review.save();

	if (!review)
		res.status(500).send("This review was not sent to database...");

	res.redirect("/admin/addreview");
});


router.get("/updatecategory", ensureAuthenticated, async (req, res) => {
	const category = await Category.findOne({ _id: req.query.id }).populate(
		// "subcategory","product"
	);
	res.render("admin/updatecategory", {
		// subcategory: subcategory,
		category: category,
		user: req.user,
		// product: product,
	});
});




router.get("/updatereview", ensureAuthenticated, async (req, res) => {
	const review = await Review.findOne({ _id: req.query.id }).populate(
		// "subcategory","product"
	);
	res.render("admin/updatereview", {
		// subcategory: subcategory,
		review: review,
		user: req.user,
		// product: product,
	});
});





router.post(
	"/deletecategory/:id",
	ensureAuthenticated,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid Category id");
		}

		

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
			imagePath = `${basePath}${fileName}`;
			
			// fs.unlinkSync(`${imagePath}`);
		} else {
			const category = await Category.findById(req.params.id);
			imagePath = category.image;
			// fs.unlinkSync(`${imagePath}`);
		}
		await Category.findByIdAndDelete(req.params.id, { new: true });

	

		res.redirect("/admin/category");
	}
);




router.post(
	"/updatecategory/:id",
	ensureAuthenticated,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid Category id");
		}

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const category = await Category.findById(req.params.id);
			imagePath = category.image;
		}

		const updateCategory = await Category.findByIdAndUpdate(
			req.params.id,
			{
				country: req.body.country,
				tag:req.body.tag,
				name: req.body.name,
				price: req.body.price,
				image: imagePath,
				product: req.body.product,
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);

		res.redirect("/admin/category");
	}
);







// router.post(
// 	"/updatereview/:id",
// 	ensureAuthenticated,
// 	async (req, res) => {
// 		if (!mongoose.isValidObjectId(req.params.id)) {
// 			return res.status(400).send("Invalid Review id");
// 		}

		
// 		const updatereview = await Review.findByIdAndUpdate(
// 			req.params.id,
// 			{
// 				cname: req.body.cname,
// 				review: req.body.review,
// 				clocation: req.body.clocation,
				
// 				updated_at: Date.now(),
// 			},
// 			{
// 				new: true,
// 			}
// 		);

// 		res.redirect("/admin/review");
// 	}
// );





router.post(
	"/deletereview/:id",
	ensureAuthenticated,
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid Review id");
		}

		

	
		await Review.findByIdAndDelete(req.params.id, { new: true });

	

		res.redirect("/admin/review");
	}
);










module.exports = router;
