class CategorySerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :products_count

    def products_count
        object.products.count
    end
end