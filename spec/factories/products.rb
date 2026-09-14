FactoryBot.define do
    factory :product do
        name { Faker::Commerce.product_name }
        description { Faker::Lorem.paragraph }
        price { Faker::Commerce.price(range: 5..100) }
        category
    end
end