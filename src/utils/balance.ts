import {prisma} from "pages/api/prisma";

export const getUserBalance = async (email: string) => {
  try {
    const userId = await prisma.user.findUnique({where: { email }});

    if(!userId) throw new Error("User Not Found");

    // get user transactions to calculate user balance
    const transactions = await prisma.transaction.findMany({where: userId});
    return transactions.reduce((acc, tx) => {
      if(tx.type == "deposit") return acc += tx.value;
      else return acc -= tx.value;
    }, 0);

  } catch(error) {
    return new Error(typeof error == "string" ? error : "Error get user balance");
  }
};