module ::ApplicationHelper
 def underscored_controller_name
    controller.class.name.underscore.gsub('/', '_')
  end
end
