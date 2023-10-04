import * as Yup from "yup";

export const planSchema = Yup.object().shape({
  name: Yup.string().required("Plan Name is required"),
  description: Yup.string().nullable(),
  status: Yup.number().integer(),
  prices: Yup.array().of(
    Yup.object().shape({
      price: Yup.number().positive().required("Price is required"),
      duration: Yup.string()
        .oneOf(["month", "year"])
        .required("Duration is required"),
    })
  ),
  monthly: Yup.number().positive().required("Monthly Price is required"),
  yearly: Yup.number().positive().required("Yearly Price is required"),
  metadata: Yup.object().shape({
    "Facebook Giveaways": Yup.boolean(),
    "Instagram Giveaways": Yup.boolean(),
    "List Giveaway": Yup.boolean(),
    "Multi-Network Giveaway": Yup.boolean(),
    "Twitter Giveaways": Yup.boolean(),
    "Youtube Giveaways": Yup.boolean(),
    "Tiktok Giveaways": Yup.boolean(),
  }),
});
