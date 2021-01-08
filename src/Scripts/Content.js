function getLogLine() {
    const controlAddIn = document.getElementById("controlAddIn");

    return (log, extraLine) => {
        const element = document.createElement("div");
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

function getALMethod(name) {
    return (...args) => {
        let result;

        window["OnInvokeResult"] = function (alResult) {
            result = alResult;
        }

        return new Promise(resolve => {
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod(name, args, false, () => {
                delete window.OnInvokeResult;
                resolve(result);
            });
        });
    }
}

function start() {
    // Modify these to change behavior!
    const INTERVAL = 1000;
    const SKIP_IF_BUSY = true;

    const nav = Microsoft.Dynamics.NAV.GetEnvironment();
    const logLine = getLogLine();
    const makeBusy = getALMethod("MakeBusy");

    logLine("Initializing event calling demo.", true);

    setInterval(
        async () => {

            let busy = nav.Busy ? "AL is busy. " : "";
            let skipped = busy && SKIP_IF_BUSY;
            let info = skipped
                ? "This method invocation is skipped."
                : "Invoking method";
            let line = logLine(busy + info);

            if (!skipped) {
                await makeBusy();
                line.update(" => response received.", "#0f0");
            }

        }, INTERVAL);
}
