"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  Grid2X2,
  Home,
  Image,
  LogOut,
  Settings,
  Tags,
  Truck,
} from "lucide-react";

import { Menu } from 'antd';
import { useRouter } from "next/navigation";


const navItems = [
  {
    label: "Dashboard",
    key: "/admin",
    icon: Home,
  },

  //Product
  {
    label: "Products",
    key: "products",
    icon: Boxes,
    children: [
      {
        label: "Product List",
        key: "/admin/products",
        icon: Boxes,
      },
      {
        label: "Product Images",
        key: "/admin/product-images",
        icon: Image,
      },
    ],
  },


  //Category 
  {
    label: "ProductInformation",
    key: "categories",
    icon: Tags,
    children: [
      {
        label: "Categories",
        key: "/admin/categories",
        icon: Tags,
      },
      {
        label: "Providers",
        key: "/admin/providers",
        icon: Truck,
      },
      {
        label: "Sources",
        key: "/admin/sources",
        icon: Grid2X2,
      },
    ],
  },

  {
    label: "Analytics",
    key: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    key: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const router = useRouter();

  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-slate-200 bg-white px-4 py-5 dark:border-white/10 dark:bg-[#070b18] lg:flex lg:flex-col">
      <Link href="/admin" className="mb-8 flex items-center gap-3 px-1">
        <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
          IP
        </div>

        <div>
          <p className="text-sm font-semibold leading-none text-slate-950 dark:text-white">
            Inventory Pro
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Enterprise Edition
          </p>
        </div>
      </Link>


      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        theme="light"
        items={navItems.map((item) => ({
          key: item.key,
          icon: <item.icon className="size-4" />,
          label: item.label,
          children: item.children?.map((child) => ({
            key: child.key,
            icon: <child.icon className="size-4" />,
            label: child.label,
          })),
          onClick:({key}) => router.push(key),
        }))}
        inlineIndent={16}
        className="flex-1 border-none bg-transparent text-sm font-medium text-slate-600 dark:text-slate-400"
      />
      

      <div className="mt-auto border-t border-slate-200 pt-4 dark:border-white/10">
        <Link
          href="/"
          className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <LogOut className="size-4" />
          Back Store
        </Link>
      </div>
    </aside>
  );
}