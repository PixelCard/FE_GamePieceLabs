type WrapperProps = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="mx-auto w-[calc(100%-100px)] max-w-[1580px] grid-cols-[1fr_auto_1fr] pt-10">
      {children}
    </div>
  );
}
