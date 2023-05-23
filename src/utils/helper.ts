import { selectItem } from "@/lib/types/bill.types";

export const toTitleCase = (str:string) => {
  const arr = str.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const titledString = arr.join(" ");
  return titledString;
};

 type item = selectItem
type itemsArr = item[]

export const reminders = [
  { name: "Same day", value: 0 },
  { name: "1 day before", value: 1 },
  { name: "2 days before", value: 2 },
];
export const categories = [
  { name: "Subscriptions", value: "" },
  { name: "Housing", value: "" },
  { name: "Utilities", value: "" },
  { name: "Insurance", value: "" },
  { name: "Food", value: "" },
  { name: "Education", value: "" },
  { name: "Savings", value: "" },
  { name: "Debt", value: "" },
];

export const frequencies = [
  {
    value: 7,
    name: "Weekly",
  },
  {
    value: 14,
    name: "Every 2 weeks",
  },
  {
    value: 30,
    name: "Monthly",
  },
  {
    value: 90,
    name: "Quarterly",
  },
  {
    value: 365,
    name: "Yearly",
  },
];

export const getCategory = (category:string, categories:itemsArr) => {
  const categoryData = categories.find((obj:item) => obj.name === category);
  console.log(categoryData);
  return categoryData;
};

export const getInitialValue = (value:Number, arr:itemsArr) => {
  let data = arr.find((obj) => obj.value === value) || {
      name: "",
      value: ""
    }
  return data 
};

export const getToday = () => {
    return new Date().toISOString().slice(0, 10)
  }