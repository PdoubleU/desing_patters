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
 * konretne komponenty zapewniają domyślne implementacje operacji. Może być
 * wiele wariantów tych klas
 */
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
    }
    BaseComponent.prototype.operation = function () {
        return "BaseComponent";
    };
    return BaseComponent;
}());
/**
 * Dekorator bazowy posiada ten sam interfejs co inne komponenty. Głównym
 * celem tej klasy jest zdefiniowanie interfejsu opakowania dla wszystkich
 * konkretnych dekoratorów. Domyślna implementacja opakowania może włączać
 * pole do przechowywania zapakowanego komponentu oraz metody jego
 * inicjalizacji.
 */
var Decorator = /** @class */ (function () {
    function Decorator(component) {
        this.component = component;
    }
    /**
     * dekorator deleguje wszystkie operacje do zapakowanego komponentu
     */
    Decorator.prototype.operation = function () {
        return this.component.operation();
    };
    return Decorator;
}());
/**
 * konkretne dekoratory wywoluja opakowany obiekt i modyfikują jego wynik w okreslony sobie sposób
 */
var UpgradedDecorator = /** @class */ (function (_super) {
    __extends(UpgradedDecorator, _super);
    function UpgradedDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * dekorator moze wywolac implementacje operacji rodzica, zamiast wywolywac
     * obiekt bezposrednio. Ten podejscie upraszcza rozszerzanie klas
     * dekoratorow
     */
    UpgradedDecorator.prototype.operation = function () {
        return "UpgradedDecorator(".concat(_super.prototype.operation.call(this), ")");
    };
    return UpgradedDecorator;
}(Decorator));
/**
 * dekoratory moga wywolac swoje metody przed lub po wywolaniu odpowiednich
 * metod zapakowanego obiektu
 */
var MasterDecorator = /** @class */ (function (_super) {
    __extends(MasterDecorator, _super);
    function MasterDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MasterDecorator.prototype.operation = function () {
        return "MasterDecorator(".concat(_super.prototype.operation.call(this), ")");
    };
    return MasterDecorator;
}(Decorator));
/**
 * kod klienta dziala ze wszystkimi obiektami implementujacymi interfejs Komponentu.
 * W ten sposob moze pozostac niezalezny od klas konkretnych komponentow z ktorymi pracuje
 */
function clientCode(component) {
    // ...
    console.log("RESULT: ".concat(component.operation()));
    // ...
}
/**
 * w ten sposob kod klienta moze wspierac zarowno proste komponenty...
 */
var simple = new BaseComponent();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");
/**
 * ...jak i zapakowane w dekoratory.
 *
 * zauwazmy, jak dekoratory moga zapakowac nie tylko proste komponenty, ale rowniez inne dekoratory.
 */
var decorator1 = new UpgradedDecorator(simple);
var decorator2 = new MasterDecorator(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
