let orderPipeline = [
    {
      $lookup: {
        from: "lineItems",
        localField: "_id",
        foreignField: "order",
        as: "lineItems",
        pipeline: [
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $addFields: {
              product: {
                $first: "$product",
              },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        linkedUser: {
          $first: "$user",
        },
        calculatedTotal: {
            $sum: "$lineItems.totalPrice",
          },
      },
    },
  ];

  module.exports = orderPipeline