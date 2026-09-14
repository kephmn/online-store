class Cart < ApplicationRecord
    # Associations
    belongs_to :user
    has_many :cart_items, dependent: :destroy
    has_many :products, through: :cart_items

    # Enum for cart status: active, abandoned, converted (to order)
    enum :status, { active: 0, abandoned: 1, converted: 2 }

    # Validations
    validates :status, presence: true

    # Calculate total price of all items in cart
    def checkout(address_id:)
        # Ensure cart is active
        return unless active?
        return unless user.addresses.exists?(id: address_id) # IDOR guard
        # Build an order from the cart
        order = user.orders.build(
            user: user,
            total: total_price,
            status: :pending,
            address_id: address_id
        )

        # Create order_items from cart_items
        cart_items.each do |cart_item|
            order.order_items.build(
                product: cart_item.product,
                quantity: cart_item.quantity,
                price: cart_item.product.price  # Store price at time of purchase
            )
        end

        # Save order and mark cart as converted in a transaction
        Cart.transaction do 
            order.save!
            update!(status: :converted)
            cart_items.destroy_all # Clear cart items after conversion
        end

        order
    end

    def total_price
        cart_items.sum { |item| item.product.price * item.quantity }
    end
end