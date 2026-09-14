class ProductSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :price, :category_name

    def category_name
        object.category&.name
    end
end