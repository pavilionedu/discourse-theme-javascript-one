/* learning_step
* unit:        discourse_theme_development.6
* number:      4
* title:       Interacting with Discourse javascript
* description: Now that we've loaded Clippy, we want to make him react to changes
*              on the page. This is going to require interacting with the Discourse
*              javascript.
*
*              The most common way of interacting with Discourse javascript is
*              modifying it, or setting up callbacks or hooks when the page is
*              loaded and the Ember app is initialized. One of the most common
*              javascript files you'll find in a Discourse theme or plugin is an
*              "initializer". As the name suggests, these are scripts that are
*              run when the app is initialized. When you use the Discourse Theme
*              CLI to create your theme it will automatically generate a blank
*              initializer for you.
*
*              If you want to read more about initializers and how they work,
*              have a read through the description in the Ember docs. If you're
*              really keen and want to see how the Discourse app itself is
*              initialized, go through the "pre-intializers" folder in the
*              Discourse client. The initializers in there do the heavy lifting
*              in the setup of the Discourse Ember app.
*/
/* /learning_step */

/* learning_step
* unit:        discourse_theme_development.6
* number:      5
* title:       Using the client side Plugin API
* description: For any javascript in a Discourse theme that extends or modifies
*              Discourse functionality, you'll be using the Discourse client side
*              plugin API in an initializer. You'll find the client side plugin
*              API defined in this file
*
*              ```
*              app/assets/javascripts/discourse/app/lib/plugin-api.js
*              ```
*              ([GitHub link](https://github.com/discourse/discourse/blob/main/app/assets/javascripts/discourse/app/lib/plugin-api.js))
*
*              Open this file now in your code editor and scroll through it.
*              You'll see a number of methods, each with a comment block above
*              it describing what the method does and how to use it. Take a bit
*              of time to read through this file to get a sense of what methods
*              are available.
*
*              The method we've imported from that file - ``withPluginApi`` -
*              which you'll always see in the default initializer created for
*              you by the Discourse Theme CLI, is the wrapper for all plugin api
*              methods in an initializer. It lets you set the version of the API
*              you're using (always use the latest version at the time you
*              create your theme), and gives you an ``api`` object in the
*              callback you can use to access the client side API methods.
*
* exercise:    When you're done looking through the Plugin API see if you can
*              figure out how to make Clippy do the following by moving the
*              Clippy initialization from the ``body_tag`` to the initializer,
*              and using the plugin api methods in the ``withPluginApi`` callback
*
*              - Say hello when he's initially loaded
*
*              - Tell you what the title of the page is when it changes.
*
*              You'll find some clues in the theme components referenced back in
*              Step 1 of this unit.
*/
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "theme-javascript-initializer",
  initialize() {
    withPluginApi("0.8.30", api => {

    });
  }
};
/* /learning_step */

/* learning_step
* unit:        discourse_theme_development.6
* number:      6
* title:       Using the client-side event bus.
* description: Now that we're loading our external javascript when Discourse is
*              initialized, and we've made it interact with page changes, the
*              next step is to make it interact with other events in the Discourse
*              client. Here we can use the Discourse client-side event bus.
*
*              In the plugin-api.js file, find the api method ``onAppEvent``.
*              This is the wrapper we can use to register callbacks when specific
*              events occur. But how do we know what events are available?
*              Currently, there's no better way to find Discourse client-side
*              events aside from doing a folder search. Specifically, we want to
*              search for ``.trigger(`` in
*
*              ```
*              app/javascripts/discourse/app
*              ```
*              ([GitHub link](https://github.com/discourse/discourse/blob/main/app/javascripts/discourse/app))
*
*              This will give you a list of results that look like this
*
*              ```
*              this.appEvents.trigger(<event_name>, arguments);
*              ```
*
*              The ``<event_name>`` part, e.g. "modal:closed", is what we use as
*              the first argument in the ``onAppEvent`` method, the second argument
*              being a callback we can attach to the event. Our callback will
*              get whatever arguments are passed to the event trigger.
*
* exercise:    Use the client side event bus to make Clippy say something
*              whenever you open the composer. Then see if you can make him
*              perform different animations when you type something in the
*              composer (as he sometimes used to do in MS Word).
*/
/* /learning_step */

/* learning_step
* unit:        discourse_theme_development.6
* number:      7
* title:       The idiosyncrasies of the Plugin API
* description: Before we move on from Clippy, we're going to use him for one
*              more customisation which demonstrates an aspect of the client side
*              plugin API, namely it's idiosyncratic nature.
*
*              The client-side plugin API has largely been developed on a needs
*              basis. This means that there are a number of quite specific
*              methods which don't necessarily fit into a pattern. This is
*              no-doubt part of the reason why the plugin api doesn't have
*              seperate documentation.
*
*              Because of this, whenever you're customising something in
*              Discourse javascript, even if you're quite experienced, it's a
*              good idea to re-check the available API methods before you
*              consider using the "generic" API method ``modifyClass`` which
*              allows you to modify nearly any javascript in Discourse. We'll
*              cover that approach in the next unit(s), however if there's a more
*              specific method available, one that targets your use case, it's
*              best to use that.
*
* exercise:    Find a method in the api that will let you check whether a post
*              contains the words "I hate Clippy", then prevent such a post from
*              being posted, and get Clippy to say a disapproving message in
*              response. You'll need to use some of the codebase searching skills
*              we covered in previous units.
*/
/* /learning_step */