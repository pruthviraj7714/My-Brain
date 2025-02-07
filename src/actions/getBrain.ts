import prisma from "@/lib/db";

export const getBrain = async (userId: string) => {
  try {
    const contents = await prisma.content.findMany({
      where: { userId },
    });

    return contents;
  } catch (error) {
    console.error("Error fetching contents:", error);
    throw new Error("Failed to fetch contents");
  }
};
