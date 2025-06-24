import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    cart: [],
    totalItems: 0,
    totalAmount: 0,
};

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: INITIAL_STATE.cart,
            totalItems: INITIAL_STATE.totalItems,
            totalAmount: INITIAL_STATE.totalAmount,
            addToCart: (product) => {
                const cart = get().cart;
                const cartItem = cart.find(
                    (item) => item.slug === product.slug,
                );
                if (cartItem) {
                    const updatedCart = cart.map((item) =>
                        item.slug === product.slug
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    );
                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + 1,
                        totalAmount: Math.max(state.totalAmount + product.sellingPrice, 0),
                    }));
                } else {
                    const updatedCart = [...cart, { ...product, quantity: 1 }];

                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + 1,
                        totalAmount: Math.max(state.totalAmount + product.sellingPrice, 0),
                    }));
                }
            },
            removeFromCart: (product) => {
                const cart = get().cart;
                const cartItem = cart.find(
                    (item) => item.slug === product.slug,
                );
                if (cartItem) {
                    const updatedCart = cart
                        .map((item) =>
                            item.slug === product.slug
                                ? { ...item, quantity: item.quantity - 1 }
                                : item,
                        )
                        .filter((item) => item.quantity > 0);
                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems - 1,
                        totalAmount: Math.max(state.totalAmount - product.sellingPrice, 0),
                    }));
                }
            },
            deleteFromCart: (product) => {
                const cart = get().cart;
                const updatedCart = cart.filter(
                    (item) => item.slug !== product.slug,
                );
                set((state) => ({
                    cart: updatedCart,
                    totalItems: state.totalItems - product.quantity,
                    totalAmount: Math.max(
                        state.totalAmount - product.sellingPrice * product.quantity,
                        0,
                    ),
                }));
            },
            clearCart: () => {
                set(INITIAL_STATE);
            },
        }),
        {
            name: "cart",
        },
    ),
);
