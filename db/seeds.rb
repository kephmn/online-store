# Create categories
categories = ['Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Sports & Outdoors'].map do |name|
    Category.find_or_create_by!(name: name)
end

# Create sample products
categories.each do |category|
    5.times do
        Product.find_or_create_by!(
            name: Faker::Commerce.product_name,
            description: Faker::Lorem.paragraph,
            price: Faker::Commerce.price(range: 5..100),
            category: category
        )
    end
end

puts "Seeded #{Category.count} categories and #{Product.count} products."