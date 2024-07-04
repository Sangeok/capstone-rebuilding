import { User, WishList } from '@prisma/client';

export type UserWithWishList = User & { wishList: WishList[] };