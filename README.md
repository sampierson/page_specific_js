Page Specific JavaScript Framework
==================================

This is a page-specific JavaScript framework (primarily for Rails).

It allows you to target JS to run on all pages, for a specific action on all pages (e.g. index),
for all actions for a specific controller, or for one page (specific controller/action).

Dependencies
------------
* Rails 3.1+
* JQuery

Installation
------------

1.  Require the gem. Add the following to your Gemfile, then run 'bundle install':

        gem 'page_specific_js'

2.  Cause the page-specific JS framework to be loaded.  For Rails 3.1: in your
    app/assets/javascripts/application.css.scss:

        //= require page_specific

3.  Create a JS namespace for your page-specific code, and call PageSpecific.init() on page load.
    This system assumes you follow the best-practise of namespacing all of your application JavaScript.
    For example let's assume you are namespacing all your JS under class "MyApplication".
    Put this in an appropriate spot in your JavaScript:

        MyApplication.PageSpecific = {};

        $(document).ready(function() {
          PageSpecific.init(MyApplication);
        });

4.  Set data-controller_name and data-action_name attributes on your document body, e.g. if you are using ERB,
    in application.html.erb:

        <body data-controller_name="<%= underscored_controller_name %>",
              data-action_name="<%= action_name %>">

    or if you are using HAML, in application.html.haml:

        %body{ :'data-controller_name' => underscored_controller_name, :'data-action_name' => action_name }

    and in app/helpers/application_helper.rb add:

        module ApplicationHelper
         def underscored_controller_name
            controller.class.name.underscore.gsub('/', '_')
          end
        end

Usage
-----

Write controller or page specific JavaScript as follows:

    MyApplication.PageSpecific['AllControllers'] = {

      allActions: function() {
        // JS to be executed on every page
      },

      indexAction: function() {
        // code to be executed on all index pages
      }
    };

    MyApplication.PageSpecific['FooController'] = {

      allActions: function() {
        // code to be executed on all pages of FooController
      },

      barAction: function() {
        // code to be executed on FooController#bar page
      }
    }

Notes
-----

*   This is not an original teqhnique.  I learned it from others while developing at Pivotal Labs and have
    implemented it several times over the years.  This just my cleaned up and organized version.

*   All you JavaScript is still going to get loaded on every page; this only impacts what is executed.
    In practice this is not an issue as your javascript should be aggregated, minified, compressed and cached.

License
-------
MIT.  See LICENSE.txt