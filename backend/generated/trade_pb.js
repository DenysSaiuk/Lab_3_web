/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Trade = (function() {

    /**
     * Namespace Trade.
     * @exports Trade
     * @namespace
     */
    var Trade = {};

    Trade.Trade = (function() {

        /**
         * Properties of a Trade.
         * @memberof Trade
         * @interface ITrade
         * @property {string|null} [stream] Trade stream
         * @property {string|null} [coin] Trade coin
         * @property {string|null} [price] Trade price
         * @property {string|null} [quantity] Trade quantity
         * @property {number|Long|null} [tradeTime] Trade tradeTime
         */

        /**
         * Constructs a new Trade.
         * @memberof Trade
         * @classdesc Represents a Trade.
         * @implements ITrade
         * @constructor
         * @param {Trade.ITrade=} [properties] Properties to set
         */
        function Trade(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Trade stream.
         * @member {string} stream
         * @memberof Trade.Trade
         * @instance
         */
        Trade.prototype.stream = "";

        /**
         * Trade coin.
         * @member {string} coin
         * @memberof Trade.Trade
         * @instance
         */
        Trade.prototype.coin = "";

        /**
         * Trade price.
         * @member {string} price
         * @memberof Trade.Trade
         * @instance
         */
        Trade.prototype.price = "";

        /**
         * Trade quantity.
         * @member {string} quantity
         * @memberof Trade.Trade
         * @instance
         */
        Trade.prototype.quantity = "";

        /**
         * Trade tradeTime.
         * @member {number|Long} tradeTime
         * @memberof Trade.Trade
         * @instance
         */
        Trade.prototype.tradeTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Trade instance using the specified properties.
         * @function create
         * @memberof Trade.Trade
         * @static
         * @param {Trade.ITrade=} [properties] Properties to set
         * @returns {Trade.Trade} Trade instance
         */
        Trade.create = function create(properties) {
            return new Trade(properties);
        };

        /**
         * Encodes the specified Trade message. Does not implicitly {@link Trade.Trade.verify|verify} messages.
         * @function encode
         * @memberof Trade.Trade
         * @static
         * @param {Trade.ITrade} message Trade message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trade.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stream != null && Object.hasOwnProperty.call(message, "stream"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.stream);
            if (message.coin != null && Object.hasOwnProperty.call(message, "coin"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.coin);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.price);
            if (message.quantity != null && Object.hasOwnProperty.call(message, "quantity"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.quantity);
            if (message.tradeTime != null && Object.hasOwnProperty.call(message, "tradeTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.tradeTime);
            return writer;
        };

        /**
         * Encodes the specified Trade message, length delimited. Does not implicitly {@link Trade.Trade.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Trade.Trade
         * @static
         * @param {Trade.ITrade} message Trade message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trade.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Trade message from the specified reader or buffer.
         * @function decode
         * @memberof Trade.Trade
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Trade.Trade} Trade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Trade.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Trade.Trade();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.stream = reader.string();
                        break;
                    }
                case 2: {
                        message.coin = reader.string();
                        break;
                    }
                case 3: {
                        message.price = reader.string();
                        break;
                    }
                case 4: {
                        message.quantity = reader.string();
                        break;
                    }
                case 5: {
                        message.tradeTime = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Trade message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Trade.Trade
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Trade.Trade} Trade
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Trade.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Trade message.
         * @function verify
         * @memberof Trade.Trade
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Trade.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.stream != null && message.hasOwnProperty("stream"))
                if (!$util.isString(message.stream))
                    return "stream: string expected";
            if (message.coin != null && message.hasOwnProperty("coin"))
                if (!$util.isString(message.coin))
                    return "coin: string expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (!$util.isString(message.price))
                    return "price: string expected";
            if (message.quantity != null && message.hasOwnProperty("quantity"))
                if (!$util.isString(message.quantity))
                    return "quantity: string expected";
            if (message.tradeTime != null && message.hasOwnProperty("tradeTime"))
                if (!$util.isInteger(message.tradeTime) && !(message.tradeTime && $util.isInteger(message.tradeTime.low) && $util.isInteger(message.tradeTime.high)))
                    return "tradeTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a Trade message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Trade.Trade
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Trade.Trade} Trade
         */
        Trade.fromObject = function fromObject(object) {
            if (object instanceof $root.Trade.Trade)
                return object;
            var message = new $root.Trade.Trade();
            if (object.stream != null)
                message.stream = String(object.stream);
            if (object.coin != null)
                message.coin = String(object.coin);
            if (object.price != null)
                message.price = String(object.price);
            if (object.quantity != null)
                message.quantity = String(object.quantity);
            if (object.tradeTime != null)
                if ($util.Long)
                    (message.tradeTime = $util.Long.fromValue(object.tradeTime)).unsigned = false;
                else if (typeof object.tradeTime === "string")
                    message.tradeTime = parseInt(object.tradeTime, 10);
                else if (typeof object.tradeTime === "number")
                    message.tradeTime = object.tradeTime;
                else if (typeof object.tradeTime === "object")
                    message.tradeTime = new $util.LongBits(object.tradeTime.low >>> 0, object.tradeTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Trade message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Trade.Trade
         * @static
         * @param {Trade.Trade} message Trade
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Trade.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.stream = "";
                object.coin = "";
                object.price = "";
                object.quantity = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.tradeTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.tradeTime = options.longs === String ? "0" : 0;
            }
            if (message.stream != null && message.hasOwnProperty("stream"))
                object.stream = message.stream;
            if (message.coin != null && message.hasOwnProperty("coin"))
                object.coin = message.coin;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = message.price;
            if (message.quantity != null && message.hasOwnProperty("quantity"))
                object.quantity = message.quantity;
            if (message.tradeTime != null && message.hasOwnProperty("tradeTime"))
                if (typeof message.tradeTime === "number")
                    object.tradeTime = options.longs === String ? String(message.tradeTime) : message.tradeTime;
                else
                    object.tradeTime = options.longs === String ? $util.Long.prototype.toString.call(message.tradeTime) : options.longs === Number ? new $util.LongBits(message.tradeTime.low >>> 0, message.tradeTime.high >>> 0).toNumber() : message.tradeTime;
            return object;
        };

        /**
         * Converts this Trade to JSON.
         * @function toJSON
         * @memberof Trade.Trade
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Trade.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Trade
         * @function getTypeUrl
         * @memberof Trade.Trade
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Trade.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Trade.Trade";
        };

        return Trade;
    })();

    return Trade;
})();

module.exports = $root;
