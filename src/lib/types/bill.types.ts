import { DateType } from "react-tailwindcss-datepicker/dist/types";

export interface Bill {
  name:string,
  price:string,
  paid?:boolean,
  category:string,
  reminder?:number | null,
  nextdue: DateType | undefined,
  userId: string | undefined

}