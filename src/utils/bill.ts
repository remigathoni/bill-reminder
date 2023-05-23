import { iBill } from "@/lib/types/bill.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// create a bill
export const createNewBill = async (
  {
  name,
  price,
  category,
  reminder,
  nextdue,
  userId
}:iBill
) => {
  try {
    const { data, error } = await supabase
      .from("Bills")
      .insert({ name, price, category, reminder, nextdue, user_id:userId })
      .select();
    if (error) {
      throw Error(error.message);
    }
    return {
      data, error
    };
  } catch (error:any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

// delete a bill

// update a bill

// get a bill


export const formatCurrency = (number:number) => {
  const formattedNumber = number.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
  });
  return formattedNumber;
};
// get all bills
export const getAllBills = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("Bills").select().eq("user_id",userId);
    if (error) {
      throw Error(error.message);
    }
    let total = 0;
    for (let i in data) {
      total += data[i].price;
    }
    let formattedTotal = formatCurrency(total);
    return { data, total: formattedTotal };
  } catch (error:any) {
    return {
      data: null,
      formattedTotal: null,
      error: error.message,
    };
  }
};

export const getAllUnpaidBills = async () => {
  try {
    const { data, error } = await supabase
      .from("Bills")
      .select()
      .eq("paid", false);
    if (error) {
      throw new Error(error.message);
    }
    let total = 0;
    for (let i in data) {
      total += data[i].price;
    }
    let formattedTotal = formatCurrency(total);
    return { data, total: formattedTotal };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

const getDayDifference = (nextdue:string) => {
  const today = new Date(); // Get today's date
  const dueDate = new Date(nextdue); // Set due date

  // Calculate the difference between the dates in milliseconds
  const differenceMs = dueDate.getTime() - today.getTime();

  // Convert the difference to days and round to the nearest integer
  const differenceDays = Math.round(differenceMs / 86400000);
  return differenceDays;
};


export const getDueDays = (nextdue:string) => {
  const differenceDays = getDayDifference(nextdue);
  let due = nextdue;
  let overdue = false
  if (differenceDays == 7) {
    due = "In 1 week";
  } else if (differenceDays < 0) {
    due = `Overdue by ${differenceDays * -1} ${
      differenceDays == -1 ? "day" : "days"
    }`;
    overdue = true
  } else if (differenceDays == 0) {
    due = "Due today";
  } else if (differenceDays < 7) {
    due = `In ${differenceDays} ${differenceDays == -1 ? "day" : "days"}`;
  } else {
    due = `Due on ${nextdue}`;
  }
  return {due, overdue};
};

export const dueSoon = (nextdue:string) => {
  const days = getDayDifference(nextdue);
  if (days <= 7) {
    return true;
  }
  return false;
};



export const getBillById = async (id:string) => {
  try {
    const { data, error } = await supabase.from("Bills").select().eq("id", id);
    if (error) throw Error(error.message);
    return { data, error: null };
  } catch (error:any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

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

export const markAsPaid = async (id:string) => {
  // update the bill
  try {
    const { error } = await supabase
      .from("Bills")
      .update({ paid: true })
      .eq("id", id);

    if (error) throw Error(error.message);
    return { error: null };
  } catch (error:any) {
    return {
      error: error.message,
    };
  }

  // mark paid
};

export async function markAsUnpaid(id:string) {
  try {
    const bill = await getBillById(id);
    if (bill.error) throw Error(bill.error);
    const { error } = await supabase
        .from("Bills")
        .update({ paid: false })
        .eq("id", id);
      if (error) throw Error(error.message);
    
    return { error: null };
  } catch (error:any) {
    return { error: error.message };
  }
}

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
