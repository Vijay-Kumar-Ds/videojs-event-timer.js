/*! videojs-event-timer
 *
 * Trigger events at specified time.
 * Created by Paul for JES.
 * */
(function(window, videojs) {
    'use strict';

    var defaults = {
        option: true
    },
    event_timer;

    /**
     * Initialize the plugin.
     * @param options {object} events and play time. Events will be triggered at specified play_time once.
     */
    event_timer = function(options) {
      var remain_events;
        var settings = videojs.util.mergeOptions(defaults, options);
        var player = this;

        this.on('timeupdate', timeUpdated);
        this.on('play', setRemainEvents);
        this.on('ended', timeUpdated);

        /**
         * When time updated, need to check against event list.
         */
        function timeUpdated(timeUpdatedEvent){
            var current_time = this.currentTime();

            for (var key in remain_events) {
              var obj = remain_events[key];
              if (current_time > obj.play_time) {
                jQuery(document).trigger(obj.event_name, {'current_time': current_time, 'event': obj});
                console.log(current_time + " / " + obj.play_time + " / " + obj.event_name);
                // Delete events after being triggered.
                delete remain_events[key];
              }
            }

            // a special event for video ended in case some events only need to be triggered at the end.
            if(timeUpdatedEvent.type === "ended") {
              jQuery(document).trigger("video_ended", {'current_time': current_time, 'event': "video_ended"});
              console.log('video_ended');
            }
        }

        /**
         * In case video paused and start from any position, or progress bar has been changed, we need to update remaining events.
         */
        function setRemainEvents(timeUpdatedEvent) {
          console.log("events type: " + timeUpdatedEvent.type);
          // Copy event object since we need to keep the original one.
          remain_events = JSON.parse(JSON.stringify(options.events));

          var current_time = this.currentTime();
            for (var key in remain_events) {
              var obj = remain_events[key];
              if (current_time > obj.play_time) {
                delete remain_events[key];
              }
            }
        }


    };

    // register the plugin
    videojs.plugin('event_timer', event_timer);
})(window, window.videojs);
