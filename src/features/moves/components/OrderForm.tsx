import { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useFormik, type FormikErrors } from "formik";
import toast from "react-hot-toast";
import { useCreateOrder } from "../services/createOrder";
import { orderSchema } from "../validation/createOrder";
import type { CreateOrderRequest } from "../types/orderForm";
import FormField from "../../../shared/components/molecules/FormField";
import { Button } from "../../../shared/components/atoms/Button";
import EstimationBox from "./EtmitionPriceForm";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const vehicleOptions = [
  { label: "Car", value: "car" },
  { label: "Bike", value: "bike" },
  { label: "Truck", value: "truck" },
];

const libraries: "places"[] = ["places"];

const OrderForm = () => {
  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null);
  const deliveryRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null
  );
  const [deliveryCoords, setDeliveryCoords] = useState<[number, number] | null>(
    null
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createOrder, isPending } = useCreateOrder();

  const formik = useFormik({
    initialValues: {
      pickup: {
        address: "",
        coordinates: { type: "Point", coordinates: [0, 0] },
      },
      delivery: {
        address: "",
        coordinates: { type: "Point", coordinates: [0, 0] },
      },
      vehicleType: "",
      items: [{ name: "", quantity: 1 }],
    },
    validationSchema: orderSchema,
    onSubmit: (values) => {
      if (!pickupCoords || !deliveryCoords) {
        toast.error("Please select valid pickup and delivery addresses", {
          position: "bottom-right",
        });
        return;
      }

      values.pickup.coordinates.coordinates = pickupCoords;
      values.delivery.coordinates.coordinates = deliveryCoords;

      createOrder(values as CreateOrderRequest, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getUserOrders"] });
          toast.success("Order created successfully", {
            position: "bottom-right",
          });
          formik.resetForm();
          setPickupCoords(null);
          setDeliveryCoords(null);
          setTimeout(() => {
            navigate("/trips");
          }, 2000);
        },
        onError: () => {
          toast.error("Failed to create order", {
            position: "bottom-right",
          });
        },
      });
    },
  });

  // Estimate price automatically when data is available

  const itemErrors = formik.errors.items as
    | FormikErrors<{ name: string; quantity: number }>[]
    | undefined;
  const itemTouched = formik.touched.items as
    | { name?: boolean; quantity?: boolean }[]
    | undefined;

  const handlePlaceChange = (
    ref: React.MutableRefObject<google.maps.places.Autocomplete | null>,
    path: string,
    setCoords: (coords: [number, number]) => void
  ) => {
    const place = ref.current?.getPlace();
    if (place?.formatted_address && place.geometry?.location) {
      const loc = place.geometry.location;
      formik.setFieldValue(path, place.formatted_address);
      setCoords([loc.lng(), loc.lat()]);
    }
  };

  return (
    <LoadScript
      // googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      googleMapsApiKey="AIzaSyAdvwX9PKWFuHIVYhBcE0q6qnFG7aRaCbw"
      libraries={libraries}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full p-6 bg-white rounded shadow space-y-4"
      >
        {/* Pickup Address */}
        <div>
          <Autocomplete
            onLoad={(auto) => (pickupRef.current = auto)}
            onPlaceChanged={() =>
              handlePlaceChange(pickupRef, "pickup.address", setPickupCoords)
            }
          >
            <FormField
              label="Pickup Address"
              id="pickup.address"
              name="pickup.address"
              value={formik.values.pickup.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter pickup address"
              error={
                formik.touched.pickup?.address && formik.errors.pickup?.address
                  ? formik.errors.pickup.address
                  : undefined
              }
            />
          </Autocomplete>
        </div>

        {/* Delivery Address */}
        <div>
          <Autocomplete
            onLoad={(auto) => (deliveryRef.current = auto)}
            onPlaceChanged={() =>
              handlePlaceChange(
                deliveryRef,
                "delivery.address",
                setDeliveryCoords
              )
            }
          >
            <FormField
              label="Delivery Address"
              id="delivery.address"
              name="delivery.address"
              value={formik.values.delivery.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter delivery address"
              error={
                formik.touched.delivery?.address &&
                formik.errors.delivery?.address
                  ? formik.errors.delivery.address
                  : undefined
              }
            />
          </Autocomplete>
        </div>

        {/* Vehicle Type - Radio Buttons */}
        <div className="space-y-2">
          <label className="block font-medium mb-1">Vehicle Type</label>
          <div className="flex gap-4">
            {vehicleOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="vehicleType"
                  value={option.value}
                  checked={formik.values.vehicleType === option.value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {option.label}
              </label>
            ))}
          </div>
          {formik.touched.vehicleType && formik.errors.vehicleType && (
            <p className="text-red-500 text-sm">{formik.errors.vehicleType}</p>
          )}
        </div>

        {/* Item Name */}
        <FormField
          id="items[0].name"
          label="Item Name"
          placeholder="e.g. Sofa"
          value={formik.values.items[0].name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            itemTouched?.[0]?.name && itemErrors?.[0]?.name
              ? itemErrors[0].name
              : undefined
          }
        />

        {/* Quantity */}
        <FormField
          id="items[0].quantity"
          label="Quantity"
          type="number"
          min={1}
          value={formik.values.items[0].quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            itemTouched?.[0]?.quantity && itemErrors?.[0]?.quantity
              ? itemErrors[0].quantity
              : undefined
          }
        />

        <EstimationBox
          pickupCoords={pickupCoords}
          deliveryCoords={deliveryCoords}
          vehicleType={formik.values.vehicleType}
        />

        {/* Google Map */}
        <div className="h-[300px] mt-4">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={
              pickupCoords
                ? { lat: pickupCoords[1], lng: pickupCoords[0] }
                : { lat: 30.0444, lng: 31.2357 }
            }
            zoom={7}
          >
            {pickupCoords && (
              <Marker
                position={{ lat: pickupCoords[1], lng: pickupCoords[0] }}
                draggable
                onDragEnd={(e) => {
                  const lat = e.latLng?.lat();
                  const lng = e.latLng?.lng();
                  if (lat && lng) setPickupCoords([lng, lat]);
                }}
              />
            )}
            {deliveryCoords && (
              <Marker
                position={{ lat: deliveryCoords[1], lng: deliveryCoords[0] }}
                draggable
                onDragEnd={(e) => {
                  const lat = e.latLng?.lat();
                  const lng = e.latLng?.lng();
                  if (lat && lng) setDeliveryCoords([lng, lat]);
                }}
              />
            )}
          </GoogleMap>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          className="w-full text-white hover:cursor-pointer"
        >
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </LoadScript>
  );
};

export default OrderForm;
