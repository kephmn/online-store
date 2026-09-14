class Order < ApplicationRecord
    # Associations
    belongs_to :user
    belongs_to :address, optional: true # Shipping address (may be absent for pending orders)
    has_many :order_items, dependent: :destroy
    has_many :products, through: :order_items

    # Enum for order status
    enum :status, { pending: 0, paid: 1, shipped: 2, delivered: 3, cancelled: 4 }

    # Validations
    validates :total, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :status, presence: true

    # After creation, send confirmation email (using Sidekiq)
    after_create :send_confirmation_email

    private

    def send_confirmation_email
        # Queue a job to send email (we'll define OrderMailer later)
        OrderMailer.confirmation(self).deliver_later
    end
end