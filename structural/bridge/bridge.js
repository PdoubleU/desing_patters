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
/**
 * Abstrakcja (nie mylić z klasa abstrakcyjna) definiuje interfejs sterowania
 * dla dwoch hierarchii klas. Utrzymuje referencje do obiektu z hierarchii implementacji
 * i deleguje wszystkie rzeczywiste zadania do tego obiektu.
 */
var Abstraction = /** @class */ (function () {
    function Abstraction(implementation) {
        this.implementation = implementation;
    }
    Abstraction.prototype.operation = function () {
        var result = this.implementation.operationImplementation();
        return "Abstrakcja: Podstawowa operacja z:\n".concat(result);
    };
    return Abstraction;
}());
/**
 * Możesz rozszerzyć Abstraction bez zmiany klas implementacji.
 */
var ExtendedAbstraction = /** @class */ (function (_super) {
    __extends(ExtendedAbstraction, _super);
    function ExtendedAbstraction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendedAbstraction.prototype.operation = function () {
        var result = this.implementation.operationImplementation();
        return "Rozszerzona abstrakcja: Rozszerzona operacja z:\n".concat(result);
    };
    return ExtendedAbstraction;
}(Abstraction));
/**
 * kazda konkretna implementacja odpowiada konkretnemu systemowi i implementuje interfejs
 * za pomocą API tego systemu
 */
var AndroidImplementation = /** @class */ (function () {
    function AndroidImplementation() {
    }
    AndroidImplementation.prototype.operationImplementation = function () {
        return "AndroidImplementation: Wynik działania platformy Android.";
    };
    return AndroidImplementation;
}());
var IOSImplementation = /** @class */ (function () {
    function IOSImplementation() {
    }
    IOSImplementation.prototype.operationImplementation = function () {
        return "IOSImplementation: Wynik działania platformy IOS.";
    };
    return IOSImplementation;
}());
/**
 * z wylaczeniem fazy inicjalizacji, gdzie obiekt Abstraction jest powiazany z konkretnym obiektem implementacji
 * kod klienta powinien zalezec tylko od klasy Abstraction. W ten sposób kod klienta moze obslugiwac dowolna kombinacje
 * abstrakcja-implementacja
 */
function clientCode(abstraction) {
    // ..
    console.log(abstraction.operation());
    // ..
}
/**
 * kod klienta powinien pracowac z dowolna kombinacja konfiguracją abstrakcja-implementacja
 */
var implementation = new AndroidImplementation();
var abstraction = new Abstraction(implementation);
clientCode(abstraction);
console.log("");
implementation = new IOSImplementation();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
