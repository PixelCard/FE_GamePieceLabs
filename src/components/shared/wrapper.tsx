/** Container giới hạn chiều rộng và padding ngang chuẩn storefront. */
export type WrapperProps = {
  /** Nội dung cần đặt trong max-width layout. */
  children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return <div className="2xl:p-[calc([4vw-2vw])]">{children}</div>;
}
