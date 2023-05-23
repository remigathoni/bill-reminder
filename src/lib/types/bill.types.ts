import { DateType } from "react-tailwindcss-datepicker/dist/types";

export interface iBill {
  name:string,
  price:string,
  paid?:boolean,
  category?:string,
  reminder?:number | null,
  nextdue?: DateType | undefined | string,
  userId: string | undefined,

}



export interface iRetrievedBill {
  id: string,
  title: string,
  price: string,
  category?: string,
  reminder?:string,
  date?: string,
  paid: boolean
}