# videojs-event-timer.js
a plugin for video.js that trigger events at specified play time.

# Documentation

Plugin Options

This plugin was created to work with jQuery, but you can remove this dependency by modifying the source code to fit your needs.
You can pass in an options object to the plugin upon initialization. 
Options may contain following properties:

event_name: the name of event to be triggered.

play_time: seconds, at what time the event will be triggered.

