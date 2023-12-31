import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler( 
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }
  type Body = {
    tokenId: number,
    seller: string,
    amount: number,
    startingTime: number,
    endTime: number,
  }

  const { tokenId, seller, amount, startingTime, endTime } = req.body as Body;

  try {
    await checkNftExists(tokenId, seller, amount, startingTime, endTime);
    return res.status(200).json({message: "ok"})
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkNftExists = async (tokenId: number, seller: string, amount: number, startingTime: number, endTime: number) => {
  const item = await prisma.listedNft.findUnique({
    where: {
      tokenId_startingTime: {
        tokenId, startingTime,
      }
    }
  });
  if(item) {
    await prisma.listedNft.update({
      where: {
        tokenId_startingTime: {
          tokenId, startingTime,
        }
      },
      data: {
        seller,
        amount,
        startingTime,
        endTime,
        isCancelled: false,
      }
    });
  } else {
    await prisma.listedNft.create({
      data: {
        tokenId,
        seller,
        amount,
        startingTime,
        endTime, 
      }
    });
  }
}