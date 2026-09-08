export type OrderInstructionIcon =
  | "consultation"
  | "quote"
  | "deposit"
  | "completion"
  | "delivery";

export interface OrderInstruction {
  id: number;
  title: string;
  description: string;
  icon: OrderInstructionIcon;
}

export const orderInstructions = [
  {
    id: 1,
    title: "Tư vấn & Chọn mẫu",
    description:
      "Chúng tôi hỗ trợ tìm mẫu phụ kiện theo yêu cầu hoặc nhận file in sẵn từ bạn.",
    icon: "consultation",
  },
  {
    id: 2,
    title: "Chốt mẫu & Báo giá",
    description:
      "Sau khi tư vấn, bạn chốt mẫu, chúng tôi sẽ báo giá và thời gian hoàn thành.",
    icon: "quote",
  },
  {
    id: 3,
    title: "Đặt cọc & Cung cấp thông tin giao hàng",
    description:
      "Bạn đặt cọc 50% và cung cấp thông tin nhận hàng để chúng tôi chuẩn bị vận chuyển.",
    icon: "deposit",
  },
  {
    id: 4,
    title: "Hoàn thiện & Thanh toán phần còn lại",
    description:
      "Khi hoàn thành, chúng tôi thông báo để bạn thanh toán 50% còn lại trước khi giao hàng.",
    icon: "completion",
  },
  {
    id: 5,
    title: "Giao hàng",
    description:
      "Sau khi nhận đủ thanh toán, chúng tôi gửi hàng qua đơn vị vận chuyển uy tín.",
    icon: "delivery",
  },
] as const satisfies readonly OrderInstruction[];
