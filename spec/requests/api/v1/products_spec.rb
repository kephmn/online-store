require 'rails_helper'

RSpec.describe 'Api::V1::Products', type: :request do
    let!(:category) { create(:category) }
    let!(:product1) { create(:product, category: category) }
    let!(:product2) { create(:product, category: category) }

    describe 'GET /api/v1/products' do
        it 'returns all products' do
            get api_v1_products_path
            expect(response).to have_http_status(:ok)
            json_response = JSON.parse(response.body)
            expect(json_response.size).to eq(2)
        end
    end

    describe 'POST /api/v1/products' do
        let(:user) { create(:user) }
        let(:admin) { create(:admin) }

        context 'when unauthenticated' do
            it 'returns unauthorized' do
                post api_v1_products_path, params: { product: attributes_for(:product, category_id: category.id) }
                expect(response).to have_http_status(:unauthorized)
            end
        end

        context 'when authenticated as admin' do
            before { sign_in admin }

            it 'creates a new product' do
                expect {
                    post api_v1_products_path, params: { product: attributes_for(:product, category_id: category.id) }
                }.to change(Product, :count).by(1)
                expect(response).to have_http_status(:created)
            end
        end

        context 'when authenticated as customer' do
            before { sign_in user }

            it 'returns forbidden' do
                post api_v1_products_path, params: { product: attributes_for(:product, category_id: category.id) }
                expect(response).to have_http_status(:forbidden)
            end
        end
    end
end