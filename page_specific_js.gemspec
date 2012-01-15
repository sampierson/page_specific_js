# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "page_specific_js/version"

Gem::Specification.new do |s|
  s.name        = "page_specific_js"
  s.version     = PageSpecificJs::VERSION
  s.authors     = ["Sam Pierson"]
  s.email       = ["sam@sampierson.com"]
  s.homepage    = ""
  s.summary     = %q{ Page-specific JavaScript framework for Rails }
  s.description = %q{ It allows you to target JS to run on all pages,
                      for a particular action on all pages (e.g. index),
                      for all actions for a specific controller,
                      or for one specific controller/action (i.e. a single page).
                    }

  s.rubyforge_project = "page_specific_js"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  s.add_development_dependency "rake"
  s.add_development_dependency "jasmine"

  # jQuery is a dependency, but I'm leaving this commented for those folks not using jquery-rails.
  # s.add_runtime_dependency "jquery-rails"
end
