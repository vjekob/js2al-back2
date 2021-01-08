controladdin "Skip If Busy"
{
    Scripts = 'src/Scripts/Content.js';
    StartupScript = 'src/Scripts/Start.js';

    StyleSheets = 'src/Stylesheets/Demo.css';

    RequestedHeight = 200;
    RequestedWidth = 200;

    HorizontalStretch = true;
    VerticalStretch = true;

    event MakeBusy();
}
