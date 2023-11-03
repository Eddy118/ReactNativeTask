export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string];
  quanity?: number;
}

export interface IUser {
  id: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

export interface ICartProducts {
  id: string;
  productId: number;
  userId: string;
  email: string;
  productQuantity: number;
}
