module ::ApplicationHelper

  def page_specific_js_body_attrs
    { :'data-controller_name' => underscored_controller_name, :'data-action_name' => action_name }
  end

  def underscored_controller_name
    controller.class.name.underscore.gsub('/', '_')
  end
end
