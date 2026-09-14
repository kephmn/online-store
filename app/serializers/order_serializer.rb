class OrderSerializer < ActiveModel::Serializer
    attributes :id, :total, :status, :created_at
    has_many :order_items, serializer: OrderItemSerializer
end