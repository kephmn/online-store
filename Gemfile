source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.1.4"
# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"
# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"
# Build JSON APIs with ease [https://github.com/rails/jbuilder]
# gem "jbuilder"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Deploy this application anywhere as a Docker container [https://kamal-deploy.org]
gem "kamal", require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem "thruster", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"

# Authentication - Devise 5.0.x (latest)
gem 'devise', '~> 5.0'                 # User authentication (currently 5.0.4)
gem 'devise-jwt'            # JWT strategy for API authentication
gem 'dry-configurable' # Add this to resolve initialization nil errors
gem 'rack-cors', '~> 2.0'              # Cross-Origin Resource Sharing (CORS) for API

# API serialization
gem 'active_model_serializers', '~> 0.10.14' # JSON serialization of models

# JavaScript bundling (for React) - we use esbuild for speed
gem 'jsbundling-rails', '~> 1.3'       # Bundle JavaScript with esbuild
gem 'cssbundling-rails', '~> 1.4'      # Bundle CSS with Bootstrap

# Environment variables
gem 'dotenv-rails', '~> 3.1'           # Manage environment variables

# Background jobs (optional, for emails)
gem 'sidekiq', '~> 7.3'                # For asynchronous tasks like order confirmation emails

# Payment gateway (example: Stripe)
gem 'stripe', '~> 13.0'                # Payment processing

group :development, :test do
  gem 'rspec-rails', '~> 7.0'          # RSpec testing framework
  gem 'factory_bot_rails', '~> 6.4'    # Fixture replacement with factories
  gem 'faker', '~> 3.4'                # Generate fake data for seeding
  gem 'pry-rails', '~> 0.3'            # Debugging console
end

group :test do
  gem 'shoulda-matchers', '~> 6.4'     # Additional RSpec matchers
  gem 'database_cleaner-active_record' # Clean database between tests
end

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"

  # Audits gems for known security defects (use config/bundler-audit.yml to ignore issues)
  gem "bundler-audit", require: false

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem "brakeman", require: false

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem "rubocop-rails-omakase", require: false
end
