import Orders from "../Models/orderSchema.js"
import PurchaseStats from "../Models/purchaseState.js"



export const allOrders=async(req,res)=>{
    const orderdetails=await Orders.find()

    if(orderdetails.length===0){
      return  res.status(404).json({message:"no orders"})
    }
   return res.status(200).json({message:"successfully fetched",data:orderdetails})
}


//Total Revenue Generated



export const status = async (req, res) => {

        const totalStats = await Orders.aggregate([
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: { $size: "$productId" } },
                    totalRevenue: { $sum: "$totalPrice" },
                    totalPurchases: { $sum: 1 }
                }
            }
        ]);

        if (totalStats.length > 0) {
            const { totalProducts, totalRevenue, totalPurchases } = totalStats[0];

            const purchaseStats = new PurchaseStats({
                totalProducts,
                totalRevenue,
                totalPurchases
            });
            await purchaseStats.save();

            res.status(200).json({ status: "Success", data: totalStats[0] });
        } else {
            res.status(200).json({
                status: "Success",
                data: { totalProducts: 0, totalRevenue: 0, totalPurchases: 0 }
            });
        }
    
};


