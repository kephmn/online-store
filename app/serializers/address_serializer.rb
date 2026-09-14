class AddressSerializer < ActiveModel::Serializer
    attributes :id, :street, :city, :state, :zip, :country
end