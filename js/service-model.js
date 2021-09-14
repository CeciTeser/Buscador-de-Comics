var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PagedResponse = /** @class */ (function () {
    function PagedResponse(offset, limit, total) {
        this.offset = offset;
        this.limit = limit;
        this.total = total;
    }
    return PagedResponse;
}());
var Character = /** @class */ (function () {
    function Character() {
    }
    return Character;
}());
var CharactersResponse = /** @class */ (function (_super) {
    __extends(CharactersResponse, _super);
    function CharactersResponse(characters, offset, limit, total) {
        var _this = _super.call(this, offset, limit, total) || this;
        _this.characters = characters;
        return _this;
    }
    return CharactersResponse;
}(PagedResponse));
var Comic = /** @class */ (function () {
    function Comic() {
    }
    return Comic;
}());
var ComicsResponse = /** @class */ (function (_super) {
    __extends(ComicsResponse, _super);
    function ComicsResponse(comics, offset, limit, total) {
        var _this = _super.call(this, offset, limit, total) || this;
        _this.comics = comics;
        return _this;
    }
    return ComicsResponse;
}(PagedResponse));
