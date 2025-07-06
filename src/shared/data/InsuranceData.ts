interface Package {
  title: string;
  label?: string;
  price: string;
  min?: string;
  compensationLost: string;
  compensationDamaged: string;
  buttonText: string;
  variant: "default" | "outline";
}
export const packages: Package[] = [
  {
    title: "There is no insurance!",
    label: "Current Package",
    price: "0%",
    compensationLost: "500 EGP",
    compensationDamaged: "Terms and conditions apply.",
    buttonText: "I agree with this plan",
    variant: "outline",
  },
  {
    title: "Security Package",
    label: "Recommended",
    price: "0.75%",
    min: "8 EGP",
    compensationLost: "30,000 EGP",
    compensationDamaged: "Terms and conditions apply.",
    buttonText: "Implementation",
    variant: "outline",
  },
  {
    title: "Very Safe Package",
    label: "",
    price: "1%",
    min: "10 EGP",
    compensationLost: "50,000 EGP",
    compensationDamaged: "Terms and conditions apply.",
    buttonText: "Implementation",
    variant: "outline",
  },
];
