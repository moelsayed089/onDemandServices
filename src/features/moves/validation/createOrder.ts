import * as Yup from "yup";

export const orderSchema = Yup.object().shape({
  pickup: Yup.object().shape({
    address: Yup.string().required("Pickup address is required"),
    coordinates: Yup.object().shape({
      type: Yup.string().oneOf(["Point"]).required(),
      coordinates: Yup.array()
        .of(Yup.number())
        .length(2)
        .required("Pickup coordinates are required"),
    }),
  }),
  delivery: Yup.object().shape({
    address: Yup.string().required("Delivery address is required"),
    coordinates: Yup.object().shape({
      type: Yup.string().oneOf(["Point"]).required(),
      coordinates: Yup.array()
        .of(Yup.number())
        .length(2)
        .required("Delivery coordinates are required"),
    }),
  }),
  vehicleType: Yup.string().required("Vehicle type is required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Item name is required"),
        quantity: Yup.number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
      })
    )
    .required("Items are required"),
});
