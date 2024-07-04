import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//placing user order for frontend

const placeOrder = async (req,res)=>{
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"INR",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"INR",
                product_data:{
                    name:"Delivery Charges",
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

    } catch (error) {
      console.log(error);  
    }
}

export {placeOrder}