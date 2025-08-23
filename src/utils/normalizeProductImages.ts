export type RawProduct = {
    name: string;
    rating?: number;
    price: number;
    images: { url: string }[];
    stock: number;
    description: string;
    category?:  { id: string; name: string };
    averageRating?: number;
    id?: string;
};

export type ProductType = {
    name: string;
    rating?: number;
    price: number;
    stock: number;
    description: string;
    category?: { id: string; name: string };
    averageRating?: number;
    id?: string;
    images: string[];
};



export const normalizeProduct = (rawProducts: RawProduct[]): ProductType[] => {
    return rawProducts.map((product) => ({
        ...product,
        images: product.images.map((image) => image.url),
    }));
}
