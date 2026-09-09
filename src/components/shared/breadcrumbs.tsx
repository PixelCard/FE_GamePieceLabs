import Link from "next/link";

export default function BreadCrumbs() {
  return (
      <nav aria-label="Breadcrumb" className="no-scrollbar mb-5 overflow-x-auto text-sm font-medium leading-6 text-neutral-500">
        <ol className="flex w-max min-w-full items-center gap-2 whitespace-nowrap">
          <li>
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Trang chủ
            </Link>
          </li>
          <li aria-hidden="true">
            <span>/</span>
          </li>
          <li>
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Danh mục
            </Link>
          </li>
          <li aria-hidden="true">
            <span>/</span>
          </li>
          <li aria-current="page" className="font-semibold text-neutral-900">Chi tiết sản phẩm</li>
        </ol>
      </nav>
  );
}
