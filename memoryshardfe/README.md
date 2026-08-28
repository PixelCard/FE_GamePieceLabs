# MemoryShard Frontend

Frontend Next.js cho cửa hàng boardgame MemoryShard. Dự án dùng App Router, TypeScript, Tailwind CSS và shadcn/ui. Giai đoạn hiện tại tập trung xây dựng mockup giao diện trước khi nối đầy đủ API ABP.

## Trạng thái hiện tại

- Header storefront đã dùng mock data và không gọi API.
- Header desktop có mega menu `Products` và `About us`.
- Header mobile dùng `Sheet` của shadcn/ui.
- Footer storefront responsive đã dùng mock data và không gọi API.
- Footer dùng `Button`, `Card`, `Badge`, `Separator` và `DropdownMenu` của shadcn/ui.
- Các trang home, cart, product details, admin và auth cũ vẫn được giữ để phát triển tiếp.
- Landing page boardgame mới chưa nằm trong phạm vi hiện tại.

## Công nghệ và phiên bản

Các phiên bản dưới đây là phiên bản đang được khóa trong `package-lock.json` tại thời điểm cập nhật tài liệu.

| Công nghệ | Phiên bản |
| --- | --- |
| Next.js | 16.2.6 |
| React / React DOM | 19.2.4 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.3 |
| shadcn CLI | 4.19.0 |
| Radix UI | 1.6.7 |
| Lucide React | 1.34.0 |
| ESLint | 9.39.5 |
| Ant Design (legacy admin/home) | 6.6.1 |

> UI mới phải ưu tiên shadcn/ui. Ant Design chỉ còn phục vụ phần code legacy và không được dùng cho feature UI mới.

## Yêu cầu môi trường

- Node.js `>= 20.9.0` theo yêu cầu của Next.js 16.2.6.
- npm đi kèm Node.js.
- Backend ABP chỉ cần thiết khi chạy các trang còn gọi API như home cũ, cart, product details hoặc admin.

Kiểm tra môi trường:

```bash
node --version
npm --version
```

## Cài đặt

Tại thư mục `memoryshardfe`:

```bash
npm install
```

Tạo file biến môi trường local:

```powershell
Copy-Item .env.example .env.local
```

Sau đó điều chỉnh `.env.local` theo địa chỉ backend trên máy. Không commit `.env.local` hoặc secret thật.

## Chạy dự án

Development:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Kiểm tra code:

```bash
npm run lint
npm run build
```

Chạy production build tại local:

```bash
npm run build
npm run start
```

Nếu PowerShell chặn `npm.ps1`, dùng các lệnh tương ứng với `npm.cmd`, ví dụ:

```powershell
npm.cmd run dev
```

## Scripts

| Lệnh | Chức năng |
| --- | --- |
| `npm run dev` | Chạy Next.js development server |
| `npm run lint` | Chạy ESLint cho toàn bộ source |
| `npm run build` | Type-check và tạo production build |
| `npm run start` | Chạy production build đã tạo |

## Cấu trúc mã nguồn

```text
memoryshardfe/
├── public/                         # Ảnh, icon và tài nguyên tĩnh
├── src/
│   ├── app/                        # Chỉ giữ route, layout, page và route handler
│   │   ├── (storefront)/           # Home, cart và product details
│   │   ├── (routes_config)/api/    # BFF route handlers cho auth/cart
│   │   ├── admin/                  # Admin routes
│   │   ├── auth/                   # Auth UI routes
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layouts/                # Header/Footer dùng chung
│   │   ├── shared/                 # Component dùng bởi nhiều feature
│   │   └── ui/                     # Component do shadcn quản lý
│   ├── features/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── home/
│   │   ├── navigation/
│   │   └── products/
│   └── utils/                      # Tiện ích dùng chung, ví dụ cn()
├── components.json                 # Cấu hình shadcn/ui
├── next.config.ts
├── package.json
└── tsconfig.json
```

### Quy tắc tổ chức

- `src/app` chỉ chịu trách nhiệm routing và composition ở cấp trang.
- Component toàn cục đặt trong `src/components`.
- Logic, type, mock data và service riêng của một domain đặt trong `src/features/<feature>`.
- Chỉ đưa code vào thư mục dùng chung khi có từ hai feature thực sự sử dụng.
- Import nội bộ dùng alias `@/*`, ánh xạ tới `src/*`.

Ví dụ: dữ liệu menu Header nằm tại `src/features/navigation`, còn component Header nằm tại `src/components/layouts/header`.

## Header storefront

Header hiện có:

- Desktop navigation với logo nằm giữa.
- Mega menu `Products` gồm category links và ba promotional cards mock.
- Mega menu `About us` gồm các liên kết giới thiệu, vật liệu, phát triển bền vững và ba promotional cards mock.
- Chỉ một mega menu được mở tại một thời điểm.
- Đóng menu bằng cách chọn lại trigger, nhấn `Escape`, chọn link hoặc nhấn overlay.
- Search, account và cart là UI mock; cart badge đang dùng số lượng giả lập.
- Mobile navigation dùng shadcn `Sheet`.

Để thay nội dung menu, sửa:

```text
src/features/navigation/data/header-navigation.ts
```

Không đặt lệnh gọi API trực tiếp trong Header. Khi nối API thật, tạo service trong `src/features/navigation/services` và truyền view model đã chuẩn hóa vào component.

## Footer storefront

Footer hiện có:

- Ba nhóm liên kết mock: `Shop`, `Information` và `Useful links`.
- Card thương hiệu MemoryShard thay cho ảnh logo bên ngoài.
- Social links dùng Button và icon Lucide.
- Currency/language selector dùng shadcn `DropdownMenu` và chỉ giữ state tại client.
- Payment methods dùng shadcn `Badge`, không phụ thuộc ảnh bên ngoài.
- Layout responsive từ mobile một cột tới desktop bốn vùng nội dung.

Để thay nội dung Footer, sửa:

```text
src/features/navigation/data/footer-navigation.ts
```

Type của Footer nằm tại:

```text
src/features/navigation/types/footer-navigation.ts
```

Component trình bày nhận toàn bộ nội dung qua props và nằm tại `src/components/layouts/footer`. Khi nối CMS/API thật, chuẩn hóa response thành `FooterContent` trước khi truyền vào component.

## Sử dụng shadcn/ui

Cấu hình shadcn nằm trong `components.json`. Component được sinh vào `src/components/ui`.

Thêm component mới:

```bash
npx shadcn add <component-name>
```

Ví dụ:

```bash
npx shadcn add accordion
```

Không tự viết lại Button, Card, Input, Dialog, Sheet hoặc Navigation Menu khi shadcn đã có component tương ứng. Tailwind được dùng cho layout, responsive và theme token.

## Biến môi trường

| Biến | Mục đích | Giá trị local mặc định |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | URL frontend | `http://localhost:3000` |
| `NEXT_PUBLIC_API_BASE_URL` | ABP HttpApi Host | `https://localhost:44329` |
| `NEXT_PUBLIC_AUTH_SERVER_URL` | OpenIddict AuthServer | `https://localhost:44321` |
| `NEXT_PUBLIC_OIDC_CLIENT_ID` | OIDC client ID | `MemoryShard_Next` |
| `NEXT_PUBLIC_OIDC_REDIRECT_URI` | Callback BFF | `http://localhost:3000/api/auth/callback` |
| `NEXT_PUBLIC_OIDC_SCOPES` | OIDC scopes | Xem `.env.example` |

Các biến có tiền tố `NEXT_PUBLIC_` có thể xuất hiện trong browser bundle. Không đặt client secret, access token hoặc refresh token vào các biến này.

## Mock data và nối API sau này

UI mock nên đọc dữ liệu typed từ `src/features/<feature>/data`. Khi backend sẵn sàng:

1. Tạo service trong `src/features/<feature>/services`.
2. Map DTO backend sang type/view model của feature.
3. Gọi service tại Server Component hoặc BFF route handler phù hợp.
4. Giữ component trình bày nhận dữ liệu qua props, không để component phụ thuộc URL backend.

Cách này cho phép đổi Header và Footer từ mock navigation sang dữ liệu CMS/API mà không phải viết lại layout hoặc component trình bày.

## Routes chính

| Route | Mục đích |
| --- | --- |
| `/` | Storefront hiện tại |
| `/contact` | Trang liên hệ và hỗ trợ khách hàng |
| `/cart` | Giỏ hàng |
| `/productdetails` | Chi tiết sản phẩm hiện tại |
| `/auth/login` | Màn hình đăng nhập |
| `/admin/*` | Nhóm trang quản trị |
| `/api/auth/*` | BFF auth handlers |
| `/api/cart/*` | BFF cart handlers |

## Lưu ý môi trường local

- Backend local đang dùng HTTPS. Hãy tin cậy development certificate của .NET thay vì tắt kiểm tra TLS trong production.
- Header mock chạy độc lập với backend, nhưng các trang legacy có thể hiển thị lỗi dữ liệu nếu backend chưa chạy.
- Sau khi đổi cấu trúc hoặc thêm shadcn component, luôn chạy lại `npm run lint` và `npm run build`.
