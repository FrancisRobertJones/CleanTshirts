let cartPipeline = [
    {
      $lookup: {
        from: "lineItems",
        localField: "lineItemIds",
        foreignField: "_id",
        as: "lineItems",
        pipeline: [
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productDetails"
            }
          },
        ]
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "email", 
        as: "linkedUser"
      }
    },
    {
      $addFields: {
        totalCartValue: {
          $sum: "$lineItems.totalPrice" 
        }
      }
    }
  ];
  
  module.exports = cartPipeline;
  