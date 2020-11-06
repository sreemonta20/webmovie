export class MessageService {

    constructor() {
    }

    toast(message, bg) {
        if (bg === "success") {
            bg = "#4CAF50";
        } else if (bg === "danger") {
            bg = "#FF5252";
        } else if (bg === "primary") {
            bg = "#448AFF";
        } else if (bg === "info") {
            bg = "#00BCD4";
        } else {
            bg = "#4CAF50";
        }
        var toast = document.getElementById("commonToast");
        var styles = "visibility:visible;"
            + "min-width: 250px;"
            + "margin-left: -125px;"
            + "background-color:" + bg + ";"
            + "color: #fff;"
            + "text-align: center;"
            + "border-radius: 8px;"
            + "padding: 16px;"
            + "position: fixed;"
            + "z-index: 1;"
            + "left: 90%;"
            + "right: 2%;"
            + "bottom: 30px;"
            + "font-size: 17px;";
        toast.setAttribute("style", styles);
        toast.innerHTML = message;
        setTimeout(function () { toast.setAttribute("style", "visibility:hidden"); }, 10000);
    }
    toasts(message, bg,time) {
        if (bg === "success") {
            bg = "#4CAF50";
        } else if (bg === "danger") {
            bg = "#FF5252";
        } else if (bg === "primary") {
            bg = "#448AFF";
        } else if (bg === "info") {
            bg = "#00BCD4";
        } else {
            bg = "#4CAF50";
        }
        var toast = document.getElementById("commonToast");
        var styles = "visibility:visible;"
            + "min-width: 250px;"
            + "margin-left: -125px;"
            + "background-color:" + bg + ";"
            + "color: #fff;"
            + "text-align: center;"
            + "border-radius: 8px;"
            + "padding: 16px;"
            + "position: fixed;"
            + "z-index: 1;"
            + "left: 90%;"
            + "right: 2%;"
            + "bottom: 30px;"
            + "font-size: 17px;";
        toast.setAttribute("style", styles);
        toast.innerHTML = message;
        setTimeout(function () { toast.setAttribute("style", "visibility:hidden"); }, time);
    }
    loaderOpen() {
        var modal = document.getElementById("Loader");
        var styles = "display:block;";
        modal.setAttribute("style", styles); 
    }

    loaderClose() {
        var modal = document.getElementById("Loader");
        var styles = "display:none;";
        modal.setAttribute("style", styles); 
    }

    parseRange(text: string): { lower: number; upper: number; } {
        return {
            lower: 0,
            upper: 1
        };
    };

    successToaster(toastr, message, title) {
        toastr.success(message, title, {
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            closeButton: true
        });
    }

    warningToaster(toastr, message, title) {
        toastr.warning(message, title, {
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            closeButton: true
        });
    }

    errorToaster(toastr, message, title) {
        toastr.error(message, title, {
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            closeButton: true
        });
    }

    infoToaster(toastr, message, title) {
        toastr.info(message, title, {
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            closeButton: true
        });
    }

}