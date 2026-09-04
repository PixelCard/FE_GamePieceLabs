import Link from "next/link";

export default function BreadCrumbs() {
  return (
      <nav className="text-xs font-medium text-neutral-500 md:text-sm mb-5">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Trang chủ
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Danh mục
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li className="text-neutral-900">Chi tiết sản phẩm</li>
        </ol>
      </nav>
  );
}
