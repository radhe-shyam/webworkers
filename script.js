window.addEventListener('load', function () {
    document.getElementById('fibSeries').addEventListener('submit', function (e) {
        try {
            var seriesLength = Number(document.getElementById('seriesLength').value);
            if (!seriesLength && seriesLength < 1) {
                alert('Series length must be a positive number.');
            } else {
                var seriesBoard = document.getElementById('seriesBoard');
                seriesBoard.innerHTML = '<h4>Generated Fib Series:</h4>';
                if (typeof Worker == undefined) {
                    seriesBoard.innerHTML = 'Your browser doesn\'t support workers';
                } else {
                    var w = new Worker(window.URL.createObjectURL(new Blob([document.getElementById('fib-worker').textContent], { type: "text/javascript" })));
                    w.postMessage({
                        seriesLength: seriesLength
                    });
                    w.onmessage = function (event) {
                        if (event.data && event.data.destroy) {
                            w.terminate();
                        } else {
                            seriesBoard.innerHTML += event.data.result + '<br/>';
                        }
                    }
                    w.onerror = function () {

                    }
                }
            }
            e.preventDefault();
        } catch (error) {
            console.log(error);
            document.body.innerHTML = '<h1>Its not you, its US :\'(</h1>';
            e.preventDefault();
        }
    });

})