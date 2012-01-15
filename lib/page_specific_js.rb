require "page_specific_js/version"
require "page_specific_js/helper"

module PageSpecificJs
  class Engine < ::Rails::Engine
    # This causes Rails to search for assets in our vendor/assets folder
  end
end
