/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from "react";
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
import Spinner from "../../../shared/components/atoms/Spinner";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

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

  // ✅ Check if user is logged in
  const accessToken = useSelector(
    (state: RootState) => state.loginAuth.accessToken
  );

  useEffect(() => {
    if (!accessToken) {
      toast.error("Please login to create an order", {
        position: "bottom-right",
      });
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const formik = useFormik({
    initialValues: {
      pickup: {
        address: "",
        coordinates: { type: "Point" as const, coordinates: [0, 0] },
      },
      delivery: {
        address: "",
        coordinates: { type: "Point" as const, coordinates: [0, 0] },
      },
      vehicleType: "",
      items: [{ name: "", quantity: 1 }],
    },
    validationSchema: orderSchema,
    onSubmit: (values) => {
      // ✅ Validate coordinates
      if (!pickupCoords || !deliveryCoords) {
        toast.error("Please select valid pickup and delivery addresses", {
          position: "bottom-right",
        });
        return;
      }

      // ✅ Update coordinates
      values.pickup.coordinates.coordinates = pickupCoords;
      values.delivery.coordinates.coordinates = deliveryCoords;

      console.log("📦 Creating order with data:", values);

      // ✅ Create order
      createOrder(values as CreateOrderRequest, {
        onSuccess: (response) => {
          console.log("✅ Order created successfully:", response);

          queryClient.invalidateQueries({ queryKey: ["getUserOrders"] });

          toast.success(
            "Order created successfully! Searching for drivers...",
            {
              position: "bottom-right",
              duration: 5000,
            }
          );

          // ✅ Reset form
          formik.resetForm();
          setPickupCoords(null);
          setDeliveryCoords(null);

          // ✅ Navigate to trips page
          setTimeout(() => {
            navigate("/trips");
          }, 2000);
        },
        onError: (error: any) => {
          console.error("❌ Failed to create order:", error);

          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create order";

          toast.error(errorMessage, {
            position: "bottom-right",
            duration: 5000,
          });
        },
      });
    },
  });

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
      const coords: [number, number] = [loc.lng(), loc.lat()];

      formik.setFieldValue(path, place.formatted_address);
      setCoords(coords);

      console.log(`✅ ${path} set to:`, place.formatted_address, coords);
    }
  };

  return (
    <>
      <h1 className="text-body-xl text-main-color font-semibold">
        Create an order
      </h1>
      <p className="mb-2 text-body-md text-gray-500">
        Please fill out the form below to complete your order
      </p>

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
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
              options={{ componentRestrictions: { country: "eg" } }}
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
                  formik.touched.pickup?.address &&
                  formik.errors.pickup?.address
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
              options={{ componentRestrictions: { country: "eg" } }}
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
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="vehicleType"
                    value={option.value}
                    checked={formik.values.vehicleType === option.value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="cursor-pointer"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
            {formik.touched.vehicleType && formik.errors.vehicleType && (
              <p className="text-red-500 text-sm">
                {formik.errors.vehicleType}
              </p>
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

          {/* Estimation Box */}
          <EstimationBox
            pickupCoords={pickupCoords}
            deliveryCoords={deliveryCoords}
            vehicleType={formik.values.vehicleType}
          />

          {/* Google Map */}
          <div className="h-[400px] mt-4 rounded-lg overflow-hidden">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={
                pickupCoords
                  ? { lat: pickupCoords[1], lng: pickupCoords[0] }
                  : { lat: 26.8206, lng: 30.8025 }
              }
              zoom={pickupCoords || deliveryCoords ? 12 : 6}
              options={{
                restriction: {
                  latLngBounds: {
                    north: 31.7,
                    south: 21.7,
                    west: 24.7,
                    east: 36.9,
                  },
                  strictBounds: true,
                },
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              {pickupCoords && (
                <Marker
                  position={{ lat: pickupCoords[1], lng: pickupCoords[0] }}
                  label="A"
                  draggable
                  onDragEnd={(e) => {
                    const lat = e.latLng?.lat();
                    const lng = e.latLng?.lng();
                    if (lat && lng) {
                      setPickupCoords([lng, lat]);
                      console.log("📍 Pickup moved to:", [lng, lat]);
                    }
                  }}
                />
              )}
              {deliveryCoords && (
                <Marker
                  position={{ lat: deliveryCoords[1], lng: deliveryCoords[0] }}
                  label="B"
                  draggable
                  onDragEnd={(e) => {
                    const lat = e.latLng?.lat();
                    const lng = e.latLng?.lng();
                    if (lat && lng) {
                      setDeliveryCoords([lng, lat]);
                      console.log("📍 Delivery moved to:", [lng, lat]);
                    }
                  }}
                />
              )}
            </GoogleMap>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            disabled={isPending}
            className="w-full text-white hover:cursor-pointer"
          >
            {isPending ? (
              <>
                <Spinner />
                <span className="ml-1">Creating Order...</span>
              </>
            ) : (
              "Create Order & Search for Drivers 🚗"
            )}
          </Button>
        </form>
      </LoadScript>
    </>
  );
};

export default OrderForm;
