export type ThreadTag = {
  label: string;
  variant?: "default" | "cyan";
};

export type ThreadAuthor = {
  name: string;
  avatarUrl: string;
  role: "Pro Detailer" | "Member";
};

export type ThreadMedia = {
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export type Thread = {
  id: string;
  author: ThreadAuthor;
  timestamp: string;
  title: string;
  snippet: string;
  tags: ThreadTag[];
  votes: number;
  comments: number;
  previewImageUrl?: string;
  sliderMedia?: ThreadMedia;
};

export type TrendingProduct = {
  id: string;
  name: string;
  oldPrice: string;
  newPrice: string;
  dropLabel: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon: "home" | "guides" | "garage" | "saved";
  active?: boolean;
};

export type CategoryLink = {
  label: string;
  href: string;
};
