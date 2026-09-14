class OrderItemSerializer < ActiveModel::Serializer
    attributes :id, :quantity, :price, :product

    def product
        { name: object.product.name, price: object.product.price }
    end
end