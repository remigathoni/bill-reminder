import { Bill } from "@/lib/types/bill.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// create a bill
export const createNewBill = async (
  {
  name,
  price,
  paid,
  category,
  reminder,
  nextdue,
  userId
}:Bill
) => {
  try {
    const { data, error } = await supabase
      .from("Bills")
      .insert({ name, price, category, paid, reminder, nextdue, userId })
      .select();
    if (error) {
      throw Error(error.message);
    }
    return data;
  } catch (error:any) {
    return {
      error: error.message,
    };
  }
};

// delete a bill

// update a bill

// get a bill

// get all bills
// export const getAllBills = async () => {
//   try {
//     const { data, error } = await supabase.from("Bills").select();
//     if (error) {
//       throw Error(error);
//     }
//     let total = 0;
//     for (let i in data) {
//       total += data[i].price;
//     }
//     let formattedTotal = formatCurrency(total);
//     return { data, total: formattedTotal };
//   } catch (error) {
//     return {
//       error: error.message,
//     };
//   }
// };

// export const getAllUnpaidBills = async () => {
//   try {
//     const { data, error } = await supabase
//       .from("Bills")
//       .select()
//       .eq("paid", false);
//     if (error) {
//       throw Error(error);
//     }
//     let total = 0;
//     for (let i in data) {
//       total += data[i].price;
//     }
//     let formattedTotal = formatCurrency(total);
//     return { data, total: formattedTotal };
//   } catch (error) {
//     return {
//       error: error.message,
//     };
//   }
// };

// const getDayDifference = (nextdue) => {
//   const today = new Date(); // Get today's date
//   const dueDate = new Date(nextdue); // Set due date

//   // Calculate the difference between the dates in milliseconds
//   const differenceMs = dueDate.getTime() - today.getTime();

//   // Convert the difference to days and round to the nearest integer
//   const differenceDays = Math.round(differenceMs / 86400000);
//   return differenceDays;
// };


// export const getDueDays = (nextdue) => {
//   const differenceDays = getDayDifference(nextdue);

//   let due = nextdue;
//   if (differenceDays == 7) {
//     due = "In 1 week";
//   } else if (differenceDays < 0) {
//     due = `Overdue by ${differenceDays * -1} ${
//       differenceDays == -1 ? "day" : "days"
//     }`;
//   } else if (differenceDays == 0) {
//     due = "Due today";
//   } else if (differenceDays < 7) {
//     due = `In ${differenceDays} ${differenceDays == -1 ? "day" : "days"}`;
//   } else {
//     due = `Due on ${nextdue}`;
//   }
//   return due;
// };

// export const dueSoon = (nextdue) => {
//   const days = getDayDifference(nextdue);
//   if (days <= 7) {
//     return true;
//   }
//   return false;
// };

// export const formatCurrency = (number:number) => {
//   const formattedNumber = number.toLocaleString("en-KE", {
//     style: "currency",
//     currency: "KES",
//   });
//   return formattedNumber;
// };

// export const getBillById = async (id:string) => {
//   try {
//     const { data, error } = await supabase.from("Bills").select().eq("id", id);
//     if (error) throw Error(error.message);
//     return { data, error: null };
//   } catch (error) {
//     return {
//       data: null,
//       error: error.message,
//     };
//   }
// };

// const getNextDueDate = (currentDueDate, frequency) => {
//   // Parse the current due date string into a Date object
//   var currentDate = new Date(currentDueDate);

//   // Calculate the next due date by adding the frequency to the current due date
//   var nextDueDate = new Date(
//     currentDate.getTime() + frequency * 24 * 60 * 60 * 1000
//   );

//   // Return the next due date as a string in the format 'YYYY-MM-DD'
//   return nextDueDate.toISOString().slice(0, 10);
// };

// export const markAsPaid = async (id:string, currentDueDate:Date, frequency:number) => {
//   // update the bill
//   // const nextDueDate = getNextDueDate(currentDueDate, frequency);
//   try {
//     const { error } = await supabase
//       .from("Bills")
//       .update({ paid: true })
//       .eq("id", id);

//     if (error) throw Error(error.message);
//     return { error: null };
//   } catch (error) {
//     return {
//       error: error.message,
//     };
//   }

//   // mark paid
// };

// export async function markAsUnpaid(id, currentDueDate, frequency) {
//   try {
//     const bill = await getBillById(id);
//     if (bill.error) throw Error(bill.error);
//     console.log(bill.data[0].paid);
//     if (bill.data[0].paid) {
//       let currentDate = new Date(currentDueDate);
//       let nextDueDate = new Date(
//         currentDate.getTime() - frequency * 24 * 60 * 60 * 1000
//       );
//       const { error } = await supabase
//         .from("Bills")
//         .update({ paid: false, nextdue: nextDueDate })
//         .eq("id", id);
//       if (error) throw Error(error.message);
//     }
//     return { error: null };
//   } catch (error) {
//     return { error: error.message };
//   }
// }

// Update a bill

// export const updateBillById = async (id:string, updates:string) => {
//   try {
//     const { data, error } = await supabase
//       .from("Bills")
//       .update(updates)
//       .eq("id", id);
//     if (error) throw Error(error.message);
//     return { error: null };
//   } catch (error) {
//     return { error };
//   }
// };

// export const deleteBillById = async (id:string) => {
//   try {
//     const { error } = await supabase.from("Bills").delete().eq("id", id);
//     if (error) throw Error(error.message);
//     return { error: null };
//   } catch (error) {
//     return { error };
//   }
// };