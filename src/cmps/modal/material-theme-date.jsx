import lightBlue from "@material-ui/core/colors/lightBlue";
import grey from "@material-ui/core/colors/grey";
import { createTheme } from "@material-ui/core";

export const materialTheme = createTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: lightBlue.A200,
            },
        },

        MuiPickersCalendarHeader: {
            switchHeader: {
            },
        },

        MuiPickersDay: {
            day: {
                color: lightBlue.A700,
            },
            daySelected: {
                backgroundColor: grey["600"],
                borderRadius: 0
            },
            dayDisabled: {
                color: lightBlue["100"],
            },
            current: {
                color: lightBlue["900"],
            },
        },

        MuiPickersModal: {
            dialogAction: {
                color: lightBlue["400"],
            },
        },
    },
});
