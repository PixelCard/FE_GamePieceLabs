interface productCarts {
    productid: string
    quantity: number
    isSelected: boolean
    addedat: string
    updatedat: string
}

export type CartDto = {
    userid: string
    productCarts: productCarts[]
    updateCartAt: string
    lastActivityAt: string
}
