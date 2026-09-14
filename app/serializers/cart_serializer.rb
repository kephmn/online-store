class CartSerializer < ActiveModel::Serializer
    attributes :id, :status, :total_price
    has_many :cart_items, serializer: CartItemSerializer

    def total_price
        object.total_price
    end
end