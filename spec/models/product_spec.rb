require 'rails_helper'

RSpec.describe Product, type: :model do
    # Associations
    it { should belong_to(:category) }
    it { should have_many(:order_items).dependent(:restrict_with_exception) }
    it { should have_many(:orders).through(:order_items) }

    # Validations
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:price) }
    it { should validate_numericality_of(:price).is_greater_than_or_equal_to(0) }

    # Factory
    it 'has a valid factory' do
        expect(build(:product)).to be_valid
    end
end