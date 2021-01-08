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

function getALMethod(name, SKIP_IF_BUSY) {
    const nav = Microsoft.Dynamics.NAV.GetEnvironment();

    return (...args) => {
        let result;

        window["OnInvokeResult"] = function (alResult) {
            result = alResult;
        }

        return new Promise(resolve => {
            if (SKIP_IF_BUSY && nav.Busy) {
                resolve(SKIP_IF_BUSY);
                return;
            }

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
    const SKIP_TOKEN = Symbol(); // Change to false to skip

    const logLine = getLogLine();
    const makeBusy = getALMethod("MakeBusy", SKIP_TOKEN);

    logLine("Initializing event calling demo.", true);

    setInterval(
        async () => {

            let line = logLine("Invoking method");
            
            let result = await makeBusy();
            if (result === SKIP_TOKEN) {
                line.update(" => This method invocation is skipped.", "#ff0");
                return;
            }

            line.update(" => response received.", "#0f0");

        }, INTERVAL);
}
