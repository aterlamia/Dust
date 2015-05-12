var Initium = Initium || {};


(function ($) {

    Initium.Main = {
        fps: 60 ,
        canvas: null,
        context: null,
        scene: [],
        loop: false,

        update: function (scene) {
            $.each(scene,
                function (idx, object1) {
                  object1.update();
                }
            );
        }
    };

    Initium.run = function () {
        for (var i = 1; i < 30   ;i++)
        {
            Initium.Main.update(Initium.Main.scene);
        }

        Initium.Renderer.draw(Initium.Main.context, Initium.Main.scene);

        

    };

    Initium.start = function () {
        Initium.Image.load();
        Initium.limitLoop(Initium.run, Initium.Main.fps);
    };

    Initium.limitLoop = function (fn, fps) {

        // Use var then = Date.now(); if you
        // don't care about targetting < IE9
        var then = new Date().getTime();

        // custom fps, otherwise fallback to 60
        fps = fps || 60;
        var interval = 1000 / fps;

        return (function loop(time){
            requestAnimationFrame(loop);

            // again, Date.now() if it's available
            var now = new Date().getTime();
            var delta = now - then;

            if (delta > interval) {
                // Update time
                // now - (delta % interval) is an improvement over just
                // using then = now, which can end up lowering overall fps
                then = now - (delta % interval);

                // call the fn
                fn();
            }
        }(0));
    };

})(jQuery);
