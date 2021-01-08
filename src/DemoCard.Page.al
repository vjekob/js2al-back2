page 50101 "Demo Card"
{
    PageType = List;

    layout
    {
        area(content)
        {
            usercontrol(Demo; "Skip If Busy")
            {
                trigger MakeBusy();
                begin
                    Sleep(2000);
                end;
            }
        }
    }
}
