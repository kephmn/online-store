Rails.application.routes.draw do
  devise_for :users,
             module: 'api/v1',
             class_name: 'User',
             path: 'api/v1/auth',
             singular: :user,
             controllers: {
               sessions: 'api/v1/sessions',
               registrations: 'api/v1/registrations'
             },
             path_names: {
               sign_in: 'sign_in',
               sign_out: 'sign_out',
               registration: 'register'
             }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get 'auth/me', to: 'sessions#me'
      get 'users/me', to: 'users#me'

      resources :products, only: [:index, :show, :create, :update, :destroy]
      resources :categories, only: [:index, :show]

      resources :orders, only: [:index, :show] do
        member do
          post 'pay'
        end
      end

      resources :addresses, only: [:index, :create, :update, :destroy]

      resource :cart, only: [:show] do
        post 'add_item'
        delete 'remove_item'
        put 'update_item'
        delete 'clear'
        post 'checkout'
      end
    end
  end

  root to: 'home#index'
  get '*path', to: 'home#index', constraints: ->(req) { !req.path.start_with?('/api') }
end