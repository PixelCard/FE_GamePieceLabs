import type { AboutPageContent } from "@/features/about/types/about-content";

export const aboutPageContent: AboutPageContent = {
  hero: {
    eyebrow: "Về chúng tôi • GamePieceLabs",
    title: "Chế tác phụ kiện & Nâng tầm trải nghiệm Board Game",
    subtitle:
      "Chúng tôi kết hợp nghệ thuật thủ công tinh xảo, công nghệ cắt laser chính xác và vật liệu gỗ tuyển chọn để biến mỗi buổi chơi game thành một kỷ niệm đáng nhớ.",
    heroImageSrc: "/images/about/about-hero.jpg",
    heroImageAlt:
      "Bàn làm việc xưởng chế tác phụ kiện gỗ và organizer board game GamePieceLabs",
  },
  craftsmanship: {
    eyebrow: "Kỹ nghệ chế tác",
    title: "Chính xác đến từng milimet với công nghệ Laser hiện đại",
    description:
      "Mỗi chi tiết đều trải qua quy trình thiết kế 3D nghiêm ngặt, cắt khắc laser CO2 công suất cao và được xử lý bề mặt thủ công tỉ mỉ để đảm bảo độ mượt mà tuyệt đối khi sử dụng.",
    showcaseVideo: {
      type: "youtube",
      src: "https://www.youtube.com/embed/HjsGUuQsQOY?si=ZcxnS0Ln7VPw4BqD",
      title: "How many people does it take to produce a Frosthaven Organizer?",
    },
    showcaseImageSrc: "/images/about/laser-craftsmanship.jpg",
    showcaseImageAlt:
      "Máy cắt laser đang khắc chi tiết bảng điều khiển người chơi bằng gỗ",
    showcaseCaption:
      "Quy trình khắc laser CO2 chính xác trên gỗ bạch dương cao cấp tại xưởng MemoryShard",
    features: [
      {
        title: "Khắc laser vi mô chính xác",
        description:
          "Từng ký hiệu, ô chỉ số máu (HP tracker), rãnh thẻ bài và ngăn xúc xắc đều được định vị chuẩn xác với sai số dưới 0.1mm.",
        badge: "Độ chính xác 0.1mm",
      },
      {
        title: "Gỗ Bạch Dương & Óc Chó tự nhiên",
        description:
          "Vật liệu gỗ ép bạch dương Baltic nhiều lớp có độ bền uốn vượt trội, chống cong vênh và lưu hương thơm gỗ tự nhiên dịu nhẹ.",
        badge: "100% Gỗ tuyển chọn",
      },
      {
        title: "Lắp ráp không cần keo dán",
        description:
          "Hệ thống khớp mộng (Snap-fit & Tenon joints) thông minh cho phép người chơi tháo lắp dễ dàng, chắc chắn mà không cần keo dính.",
        badge: "Thiết kế mộng khớp",
      },
      {
        title: "Tối ưu hóa không gian hộp game",
        description:
          "Vừa vặn hoàn hảo trong hộp gốc của từng tựa game, hỗ trợ cả thẻ bài đã bọc sleeve và nắp hộp đóng kín phẳng 100%.",
        badge: "Khớp 100% hộp gốc",
      },
    ],
  },
  values: {
    eyebrow: "Giá trị cốt lõi",
    title: "Product DNA",
    description:
      "As we shared our work, we quickly got a lot of positive feedback and started looking into production possibilities. With a blend of solid craftsmanship and a serious passion for gaming, Laserox came to life in 2017. Since then, we have developed many organizers and will continue to do so.",
    values: [
      {
        title: "Nghệ thuật & Tinh tế",
        description:
          "Mỗi khay đựng và organizer không chỉ hữu dụng mà còn là một tác phẩm trang trí tôn vinh góc bàn chơi của bạn.",
        imageSrc: "/images/about/valuesBox1.jpg",
      },
      {
        title: "Vật liệu Xanh (Play Green)",
        description:
          "Ưu tiên vật liệu gỗ có nguồn gốc bền vững, hạn chế tối đa rác thải nhựa và đóng gói thân thiện với môi trường.",
        imageSrc: "/images/about/valuesBox2.jpg",
      },
      {
        title: "Đồng hành cùng Người chơi",
        description:
          "Lắng nghe phản hồi từ cộng đồng board game thế giới để liên tục cập nhật thiết kế cho các bản mở rộng (expansions) mới nhất.",
        imageSrc: "/images/about/valuesBox3.jpg",
      },
      {
        title: "Độ bền Vượt thời gian",
        description:
          "Cấu trúc gia cố chịu lực bền bỉ, đồng hành cùng bạn qua hàng trăm giờ phiêu lưu và hàng ngàn ván đấu kịch tính.",
        imageSrc: "https://laserox.net/cdn/shop/files/Rectangle_45_1.png?v=1715684448&width=414",
      },
    ],
  },
  stats: {
    title: "Những con số khẳng định chất lượng",
    items: [
      {
        value: "50,000+",
        label: "Người chơi tin dùng",
        description: "Trên khắp các câu lạc bộ & gia đình",
      },
      {
        value: "150+",
        label: "Mẫu Inserts độc quyền",
        description: "Dành cho các tựa game nổi tiếng thế giới",
      },
      {
        value: "100%",
        label: "Kiểm định thủ công",
        description: "Mỗi sản phẩm đều qua khâu ráp thử",
      },
      {
        value: "4.9 / 5",
        label: "Điểm đánh giá trung bình",
        description: "Từ cộng đồng game thủ & reviewer",
      },
    ],
  },
  cta: {
    title: "Sẵn sàng nâng tầm bàn cờ của bạn?",
    description:
      "Khám phá ngay bộ sưu tập phụ kiện, inserts và bảng điều khiển người chơi được chế tác riêng cho tựa game yêu thích của bạn.",
    primaryAction: {
      label: "Khám phá sản phẩm",
      href: "/products",
    },
    secondaryAction: {
      label: "Liên hệ tư vấn",
      href: "/contact",
    },
  },
};


