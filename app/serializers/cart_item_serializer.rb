class CartItemSerializer < ActiveModel::Serializer
    attributes :id, :quantity, :product_id, :product

    def product
        { name: object.product.name, price: object.product.price }
    end

end