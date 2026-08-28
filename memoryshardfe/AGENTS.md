<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes â€” APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Knowledge Answer Enhancement (Bat buoc)

- Khi user hoi kien thuc (trong do an hoac tren mang):
  - Tra loi kien thuc chinh.
  - Them it nhat 1 bai toan doi song/thuc te thuong gap co su dung kien thuc do.
  - Giai thich vi sao kien thuc do phu hop voi bai toan.
- Uu tien vi du gan voi FE web, user flow, hieu nang, bao tri hoac e-commerce.

## Next Auth Route Rules (Bat buoc)

- Uu tien dung `src/app/api/**/route.ts` hoac route group API tuong duong cho auth logic (authorize redirect, callback, refresh, logout).
- Khong doi token truc tiep trong client page neu co the doi qua server route.
- Khong luu token OAuth trong `localStorage`/`sessionStorage`.
- Uu tien mo hinh session cookie:
  - cookie `HttpOnly + Secure + SameSite=Strict`
  - token/refresh token luu server-side (in-memory cho dev, DB/Redis cho production).
- UI pages (`src/app/**/page.tsx`) chi nen xu ly view state, khong xu ly secret/token raw.

## Source Structure Rules (Bat buoc)

- Toan bo application source dat trong `src/`; alias `@/*` tro toi `src/*`.
- `src/app` chi giu file conventions cua Next.js: `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, metadata files va composition can thiet cho route.
- Component dung chung dat trong:
  - `src/components/ui`: atomic component do shadcn quan ly.
  - `src/components/layouts`: Header, Footer va shell dung chung.
  - `src/components/shared`: component duoc nhieu feature su dung.
- Ngoai cac layout lon nhu Header va Footer, component co the xuat hien lap lai o nhieu vi tri, tren nhieu trang hoac voi nhieu bien the phai dat trong `src/components/shared`.
- Chi dat component trong `src/components/layouts` khi no thuc su dinh nghia layout/shell lon cua ung dung.
- Khong dat component nghiep vu, type hoac API client rai rac trong `src/app`.

## Feature Folder Rules (Bat buoc)

- Moi feature gom code theo domain tai `src/features/<feature>`.
- Cau truc chi tao khi thuc su can:
  - `components/`: UI rieng cua feature.
  - `data/`: typed mock data.
  - `services/`: API/backend communication.
  - `types/`: DTO va UI model cua feature.
  - `lib/` hoac `server/`: logic noi bo hoac server-only.
- API/type chi dung cho mot feature khong dat trong `src/lib`, `src/services` hoac `src/types` dung chung.
- Khong tao abstraction/repository/interface neu feature chi co mot implementation don gian.

## shadcn UI Rules (Bat buoc)

- Moi UI moi phai uu tien component trong `src/components/ui` va them bang shadcn CLI khi component chua ton tai.
- Khong tu viet lai Button, Card, Input, Dialog, Sheet, Dropdown, Navigation Menu hoac primitive khac neu shadcn da co.
- Tailwind chi dung de composition, spacing, responsive va semantic theme tokens.
- Khong them Ant Design/MUI/thu vien UI khac vao feature moi. Ant Design hien tai duoc xem la legacy cho den khi co task migrate rieng.
- Interactive component moi them `"use client"` tai boundary nho nhat can state/event/browser API; page va layout mac dinh la Server Component.

## Mock Data & API Boundary

- Mock data phai co type ro rang va dat trong `src/features/<feature>/data`.
- Component hien thi nhan data qua props, khong doc URL backend hoac environment variable truc tiep.
- Khi noi API that, dat ham giao tiep backend trong `src/features/<feature>/services` hoac BFF `route.ts` neu co security-sensitive logic.
- Header/Footer mock khong duoc goi auth, cart hoac product API khi user chua yeu cau noi du lieu that.

## Verification Rules

- Truoc khi code, doc guide lien quan trong `node_modules/next/dist/docs/` dung voi Next.js dang cai.
- Sau thay doi source, chay toi thieu `npm run lint` va `npm run build`.
- Khong ket luan hoan thanh neu build/type-check con loi do thay doi moi.
- Warning co san phai duoc ghi nhan; khong tranh thu refactor warning ngoai scope.

## Storefront Layout Rules

- Storefront shell duoc compose tai `src/app/(storefront)/layout.tsx`.
- Header dat tai `src/components/layouts/header`; Footer dat tai `src/components/layouts/footer`.
- Typed mock data cho Header/Footer dat tai `src/features/navigation/data` va type dat tai `src/features/navigation/types`.
- Footer presentation nhan `FooterContent` qua props; khong hard-code API URL hoac goi backend trong component.
- Currency/language selector chi la UI mock local cho den khi user yeu cau noi persistence/API that.
