interface Package {
  title: string;
  label?: string;
  price: string;
  min?: string;
  compensationLost: string;
  compensationDamaged: string;
  buttonText: string;
  variant: "default" | "outline";
  pathLink?: string;
}
export const packages: Package[] = [
  {
    title: "There is insurance!",
    label: "Current Package",
    price: "0 %",
    min: "0 EGP",
    compensationLost: "500 EGP",
    compensationDamaged: "Terms and conditions apply.",
    buttonText: "Start Order Now",
    variant: "outline",
    pathLink: "/order",
  },
  {
    title: "Security Package",
    label: "Recommended",
    price: "0.75 %",
    min: "8 EGP",
    compensationLost: "30,000 EGP",
    compensationDamaged: "Terms and conditions apply.",
    buttonText: "Subcribe Now",
    variant: "outline",
    pathLink: "/payment",
  },
  {
    title: "Very Safe Package",
    label: "",
    price: "1 %",
    min: "10 EGP",
    compensationLost: "50,000 EGP",
    compensationDamaged: "Terms and conditions apply.",
    buttonText: "Subcribe Now",
    variant: "outline",
    pathLink: "/payment",
  },
];
