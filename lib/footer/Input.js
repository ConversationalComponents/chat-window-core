"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_device_detect_1 = require("react-device-detect");
var Input = function (p) {
    var inputInvalid = p.inputInvalid, inputPlaceholder = p.inputPlaceholder, onKeyPress = p.onKeyPress, onChangeHandler = p.onChangeHandler, disabled = p.disabled, value = p.value, onFocusHandler = p.onFocusHandler, isRtl = p.isRtl;
    var textAreaRef = react_1.useRef();
    var _a = react_1.useState(p.minHeight || 56), height = _a[0], setHeight = _a[1];
    react_1.useEffect(function () {
        var _a;
        setHeight((_a = textAreaRef) === null || _a === void 0 ? void 0 : _a.current.scrollHeight);
        if (value === "") {
            setHeight(p.minHeight || 56);
        }
    }, [value]);
    var onBlurHandler = function (e) {
        return p.onBlurHandler ? p.onBlurHandler(e) : "";
    };
    react_1.useEffect(function () {
        if (disabled === false && !react_device_detect_1.isMobile) {
            textAreaRef.current.focus();
        }
    }, [disabled]);
    return (react_1.default.createElement("textarea", { style: {
            direction: isRtl ? "rtl" : "ltr",
            borderBottomLeftRadius: isRtl ? "0px" : "10px",
            borderBottomRightRadius: isRtl ? "10px" : "0px",
            width: "100%",
            border: "none",
            boxShadow: "none",
            boxSizing: "border-box",
            fontSize: "16px",
            padding: (p.padding || 18) + "px",
            paddingRight: isRtl ? (p.padding || 18) + "px" : "55px",
            paddingLeft: isRtl ? "55px" : (p.padding || 18) + "px",
            height: height + "px",
            maxHeight: (p.maxHeight || 110) + "px",
            lineHeight: "20px",
            fontFamily: "sans-serif",
            scrollbarWidth: "thin",
            opacity: disabled && !inputInvalid ? 0.5 : 1,
            outline: "none",
            overflow: "auto",
            resize: "none",
            "&:disabled": {
                background: "#fff",
            },
        }, ref: textAreaRef, rows: 1, value: value, disabled: disabled, placeholder: inputInvalid ? "" : inputPlaceholder, onKeyPress: onKeyPress, onChange: onChangeHandler, onFocus: onFocusHandler, onBlur: onBlurHandler, autoFocus: false, wrap: "true", autoComplete: "false", spellCheck: "true", id: "coco_chat_window_textarea" }));
};
exports.default = Input;
