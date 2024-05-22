import Products from "../Models/productSchema.js";
import productJoi from "../Validation/productValidation.js";

export const createProducts = async (req, res) => {
    const { error, value } = productJoi.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
    const { title, description, price, category, image } = value;
    const newProduct = new Products({
      title: title,
      description: description,
      price: price,
      category: category,
      image: image,
    });
    console.log("hiubfi");
    await newProduct.save();
    return res.status(201).json({
      status: "success",
      message: "product added successfully",
      data: newProduct,
    });
 
};

// view all products

// export const viewAdminProducts= async(req,res, next)=>{
//    try {

//                const allproducts=await Products.findOne();

//                console.log(allproducts, "poreooiie");

//                if(!allproducts){
//                   res.status(404).json({message:"product not found"})
//                }
//                res.status(200).json({status:"success",message:"successfully fetched data",data:allproducts})

//    } catch (error) {
//       next(error)
//    }

// }

export const  viewProducts =async(req,res)=>{
  
      const product=await Products.find()
      console.log(product);
   
      if(!product){ 
       return   res.status(404).json({meassge:"unable to get products"})
      }
     return res.status(200).json({status:"success",message:"successfully fetched data",data:product})
 
}
// view products by id

export const getByIdProduct = async (req, res, next) => {
    const productId = req.params.productid;

    const products = await Products.findById(productId);
    if (!products) {
      return res.status(404).json({ message: "product not found" });
    }
   return res.status(200).json(products);
 
};

//view products by category

export const productsCategory = async (req, res) => {
  const { categoryname } = req.params;
  const product = await Products.find({
    $or: [
      { category: { $regex: new RegExp(categoryname, "i") } },
      { title: { $regex: new RegExp(categoryname, "i") } },
    ],
  }).select("title category price");
  if (product.length === 0) {
    return res.status(404).json({ message: "no item found" });
  }
  return res.status(200).json({ product });
};

//find and update product

// export const adminUpdateProduct = async (req, res, next) => {
//    try {
//       const { productid } = req.params;
//       const findproduct = await Products.findById(productid);
//        console.log("befor update",findproduct);
//       if (!findproduct) {
//          return res.status(404).json({ message: "Product not found" });
//       }

//       const { title, category, description, price} = req.body;

//       console.log("body",title);

//       if (title) findproduct.title = title;
//       if (category) findproduct.category = category;
//       if (description) findproduct.description = description;
//       if (price) findproduct.price = price;
//       // if (image) findproduct.image = image;

//       await findproduct.save();

//       console.log("After Update:", findproduct);

//       res.status(200).json({ message: "Product successfully updated", data: findproduct });
//    } catch (error) {
//       next(error);
//    }
// };

//try
export const adminUpdateProduct = async (req, res) => {
    const productId = req.params.id;
    // console.log(productId);
    const { title, description, price, image, category } = req.body;

    console.log("body", req.body);

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { $set: { title, description, price, image, category } },
      { new: true } //this option returns the modified document rather than the orginal
    );
    // console.log(updatedProduct)

    if (updatedProduct) {
      const updatedProduct = await Products.findById(productId);
      return res.status(200).json({
        status: "success",
        message: "successfully updated the product",
        data: updatedProduct,
      });
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "product not found" });
    }
 
};
  




export const deleteProduct = async (req, res) => {
    const productId = req.params.productid;

    const products = await Products.findByIdAndDelete(productId);

    if (!products) {
     return res.status(404).json({ meassge: "product not found" });
    }
    return res.status(200).json({ message: "successfully delleted", data: products });
};
