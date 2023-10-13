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
 * metoda wytwórcza stosowany w celu zdefiniowania interfejsu do tworzenia
 * obiektów, ale pozostawiający podklasom decyzję o tym, które klasy instancjonować.
 * Wzorzec metoda wytwórcza definiuje metodę, która powinna być użyta zamiast
 * bezpośredniego wywołania konstruktora klasy (operator new). Podklasy mogą
 * przesłaniać tę metodę, aby zmienić klasę obiektu, który zostanie utworzony.
 */
var Creator = /** @class */ (function () {
    function Creator() {
    }
    /**
     * metoda fabryczna moze definiowac logike domyslna, ktora moze byc
     * nadpisana przez podklasy
     */
    Creator.prototype.someOperation = function () {
        // w tym przykładzie creator odwoluje sie do metody fabrycznej, aby
        // uzyskac obiekt typu Product
        var product = this.factoryMethod();
        // nastepnie produkt moze byc uzyty w dowolny sposob
        return "Ten sam tw\u00F3rca w\u0142asnie zadzia\u0142a\u0142 z ".concat(product.apiURL());
    };
    return Creator;
}());
/**
 * konkretni tworcy przeslaniaja metode fabryczna, aby zmienic typ zwracanego
 * produktu
 */
var CreateTestAPI = /** @class */ (function (_super) {
    __extends(CreateTestAPI, _super);
    function CreateTestAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Uwaga, ze sygnatura metody nadpisanej nadal uzywa typu abstrakcyjnego
     * produktu, chociaz faktyczna implementacja zwraca konkretny produkt.
     * W ten sposób metoda fabryczna pozostaje niezależna od konkretnych klas
     * produktów.
     */
    CreateTestAPI.prototype.factoryMethod = function () {
        return new TestAPI();
    };
    return CreateTestAPI;
}(Creator));
var CreateProductionAPI = /** @class */ (function (_super) {
    __extends(CreateProductionAPI, _super);
    function CreateProductionAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateProductionAPI.prototype.factoryMethod = function () {
        return new ProductionAPI();
    };
    return CreateProductionAPI;
}(Creator));
/**
 * Concrete Products provide various implementations of the Product interface.
 */
var TestAPI = /** @class */ (function () {
    function TestAPI() {
    }
    TestAPI.prototype.apiURL = function () {
        return "{TestAPI}";
    };
    return TestAPI;
}());
var ProductionAPI = /** @class */ (function () {
    function ProductionAPI() {
    }
    ProductionAPI.prototype.apiURL = function () {
        return "{ProductionAPI}";
    };
    return ProductionAPI;
}());
/**
 * kod kliencki dziala z instancjami konkretnych klas tworcow, chociaz przez
 * interfejs abstrakcyjny Creator. Dzieki temu, ze klasa aplikacji jest
 * skonfigurowana z jednym z konkretnych tworcow, nie musi ona tworzyc
 * instancji konkretnych produktow, poniewaz metoda fabryczna jest juz
 * zaimplementowana w klasie tworcy abstrakcyjnego
 */
function clientCode(creator) {
    // ...
    console.log("Nie jestem swiadom klasy twórcy', ale jestem w stanie go użyć dzięki interfejsowi");
    console.log(creator.someOperation());
    // ...
}
/**
 * w zaleznie od srodowiska, wykonujemy odpowiedni kod
 */
console.log("Applikacja testowa");
clientCode(new CreateTestAPI());
console.log("");
console.log("Aplikacja produkcyjna");
clientCode(new CreateProductionAPI());
