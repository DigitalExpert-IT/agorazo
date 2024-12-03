import { prisma } from "pages/api/prisma";

export const getUserBalance = async (email: string) => {
  try {

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    const depositTransactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        type: "DEPOSIT", 
        status: "VERIFIED"
      },
    });

    const totalBalance = depositTransactions.reduce((acc, tx) => acc + tx.value, 0);

    return totalBalance;

  } catch (error) {
    console.error("Error fetching user balance:", error);
    return new Error(
      typeof error === "string" ? error : "Error get user balance"
    );
  }
};
