function getLogLine() {
    var controlAddIn = document.getElementById("controlAddIn");

    return (log, extraLine) => {
        var element = document.createElement("div");
        element.innerHTML += log;
        if (extraLine)
            element.style.marginBottom = "1em";
        controlAddIn.appendChild(element);
        return {
            update: (text, color) => {
                element.innerText += text;
                element.style.color = color;
            }
        };
    };
}

function start() {
    // Modify these to change behavior!
    const INTERVAL = 1000;
    const SKIP_IF_BUSY = true;

    const nav = Microsoft.Dynamics.NAV.GetEnvironment();
    const logLine = getLogLine();

    logLine("Initializing event calling demo.", true);

    setInterval(
        () => {

            var busy = nav.Busy ? "AL is busy. " : "";
            var info = busy && SKIP_IF_BUSY
                ? "This method invocation is skipped."
                : "Invoking method";
            var line = logLine(busy + info);

            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod(
                "MakeBusy", [], SKIP_IF_BUSY,
                () => line.update(" => response received.", "#0f0"));

        }, INTERVAL);
}
