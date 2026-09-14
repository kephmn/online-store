class HomeController < ActionController::Base
  # Disable the default layout so we only render the HTML shell

  layout false

  def index
    render file: Rails.root.join('public', 'index.html'), layout: false
  end
end