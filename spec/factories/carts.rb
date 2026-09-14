FactoryBot.define do
    factory :cart do
        user
        status { 'active' }
    end
end