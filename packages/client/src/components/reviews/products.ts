import type { IconType } from 'react-icons';

import { BsEarbuds, BsHeadphones, BsMouse } from 'react-icons/bs';

import { HiOutlineDeviceTablet } from 'react-icons/hi2';

import { RiChargingPile2Line } from 'react-icons/ri';

type Product = {
   id: number;
   name: string;
   Icon: IconType;
};

export const products = [
   {
      id: 1,
      name: 'AirPods Pro 2',
      Icon: BsEarbuds,
   },
   {
      id: 2,
      name: 'Sony Headphones',
      Icon: BsHeadphones,
   },
   {
      id: 3,
      name: 'Logitech Mouse',
      Icon: BsMouse,
   },
   {
      id: 4,
      name: 'Galaxy Tab S9',
      Icon: HiOutlineDeviceTablet,
   },
   {
      id: 5,
      name: 'Anker 737',
      Icon: RiChargingPile2Line,
   },
] as const satisfies readonly Product[];

export type ProductId = (typeof products)[number]['id'];
