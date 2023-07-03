import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillHeart } from "react-icons/ai";
import { useState, FC } from "react";
import { getInitials } from "~/utils/ui";
import Image from "next/image";

// interface Props {
//     item: ExploreItem;
// }

const NFTcard = ({ item }: any) => {
  // const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="group flex h-fit flex-col items-center gap-2 rounded-xl shadow-md shadow-primary">
      {/* DIV PARA EL INFO EN HOVER */}
      <div className="absolute z-10 hidden w-[250px] flex-col gap-16 p-6 group-hover:flex">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-full bg-primary px-4 py-2 text-base-100">
            {item.price.toFixed(2)} EUR
          </p>
          <p className="cursor-pointer rounded-full bg-base-100 p-3 hover:text-primary">
            <AiFillHeart />
          </p>
        </div>
        <button className="rounded-full bg-primary  py-2 text-base-100 hover:bg-base-100 hover:text-primary">
          Purchase now
        </button>
      </div>
      <div className="flex h-72 justify-center overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.name}
          width={250}
          height={250}
          className="object-cover duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex w-full flex-col items-start gap-3 p-3">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <div className="flex justify-start gap-2">
          <Image
            src="/images/test.jpg"
            width={25}
            height={25}
            alt={item.name}
            className="rounded-full"
          />
          <p className="font-semibold">{getInitials(item.creator)}</p>
        </div>
        <p>{item.stock} in stock</p>
      </div>
    </div>
  );
};
export default NFTcard;
