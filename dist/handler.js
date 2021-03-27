'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: 'eu-west-1' });
var BATCH_SIZE = 1;
var sendMessage = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, messageId, body, MessageBody, params, response, error_1, errorMsg;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (event.Records.length != BATCH_SIZE) {
                    console.log('invalid event', event);
                    throw new Error("lambda has been configured for a single batch size, received " + event.Records.length);
                }
                _a = event.Records[0], messageId = _a.messageId, body = _a.body;
                console.log("received messageId:", messageId);
                MessageBody = JSON.parse(body);
                console.log("MessageBody", MessageBody);
                params = {
                    Message: MessageBody.message,
                    PhoneNumber: MessageBody.phone_number
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new aws_sdk_1.default.SNS({ apiVersion: '2010-03-31' }).publish(params).promise()];
            case 2:
                response = _b.sent();
                console.log({ response: response });
                return [2 /*return*/, {
                        statusCode: 200,
                        body: {
                            status: 'success',
                            snsResponse: response,
                        },
                    }];
            case 3:
                error_1 = _b.sent();
                errorMsg = "Error when trying to publish to SNS for " + messageId;
                console.log(errorMsg, error_1);
                throw new Error(error_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = sendMessage;
//# sourceMappingURL=handler.js.map