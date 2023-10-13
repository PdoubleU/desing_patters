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
 * podstawowy interfejs Komponentu deklaruje operacje, które mogą być
 * wykonane zarówno dla prostych jak i złożonych obiektów w strukturze
 */
var Component = /** @class */ (function () {
    function Component() {
    }
    /**
     * opcjonalnie Komponent bazowy może deklarować interfejs ustawiania i
     * dostępu do rodzica komponentu w strukturze drzewa. Może również
     * zapewnić domyślną implementację tych metod
     */
    Component.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    Component.prototype.getParent = function () {
        return this.parent;
    };
    /**
     * w niektórych przypadkach byłoby korzystne zdefiniowanie operacji
     * zarządzania dziećmi bezpośrednio w klasie bazowej Komponentu. W ten
     * sposób nie będziesz musiał ujawniać żadnych konkretnych klas
     * komponentów klientowi, nawet podczas składania drzewa obiektów. Wadą
     * jest to, że te metody będą puste dla komponentów liści.
     */
    Component.prototype.add = function (component) { };
    Component.prototype.remove = function (component) { };
    /**
     * Możesz zapewnić metodę, która pozwala klientowi zrozumieć, czy dany
     * komponent może mieć dzieci
     */
    Component.prototype.isComposite = function () {
        return false;
    };
    return Component;
}());
/**
 * klasa Liść reprezentuje obiekty końcowe w strukturze. Liść nie może mieć
 * żadnych dzieci.
 *
 * Zwykle to obiekty Liść wykonują rzeczywistą pracę, podczas gdy obiekty
 * Kompozytu jedynie delegują do swoich podkomponentów.
 */
var Leaf = /** @class */ (function (_super) {
    __extends(Leaf, _super);
    function Leaf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Leaf.prototype.operation = function () {
        return "Leaf";
    };
    return Leaf;
}(Component));
/**
 * Klasa Kompozyt reprezentuje złożone komponenty, które mogą mieć dzieci.
 * Zwykle obiekty Kompozytu delegują rzeczywistą pracę swoim dzieciom, a
 * następnie "sumują" wyniki.
 */
var Composite = /** @class */ (function (_super) {
    __extends(Composite, _super);
    function Composite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        return _this;
    }
    /**
     * Kompozyt może dodać lub usunąć inne komponenty (zarówno proste jak i
     * złożone) do lub z swojej listy dzieci.
     */
    Composite.prototype.add = function (component) {
        this.children.push(component);
        component.setParent(this);
    };
    Composite.prototype.remove = function (component) {
        var componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null);
    };
    Composite.prototype.isComposite = function () {
        return true;
    };
    /**
     * Kompozyt wykonuje swoją główną logikę w okreslony sposób. Przechodzi
     * rekursywnie przez wszystkie swoje dzieci, zbierając i sumując ich
     * wyniki. Ponieważ dzieci Kompozytu przekazują te wywołania do swoich
     * dzieci i tak dalej, całe drzewo obiektów jest przetwarzane jako
     * wynik.
     */
    Composite.prototype.operation = function () {
        var results = [];
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            results.push(child.operation());
        }
        return "Branch(".concat(results.join("+"), ")");
    };
    return Composite;
}(Component));
/**
 * kod klienta działa z wszystkimi komponentami za pośrednictwem interfejsu
 */
function clientCode(component) {
    // ...
    console.log("RESULT: ".concat(component.operation()));
    // ...
}
/**
 * w ten sposób kod klienta wspiera zarówno proste komponenty liscie...
 */
var simple = new Leaf();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");
/**
 * oraz zlozone struktury drzewiaste.
 */
var tree = new Composite();
var branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
var branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log("Client: Now I've got a composite tree:");
clientCode(tree);
console.log("");
/**
 * z uwagi na fakt, ze operacje zarzadzania dziecmi sa zdefiniowane w klasie
 * bazowej Komponentu, kod klienta moze pracowac z dowolnym komponentem, prostym
 * lub zlozonym, bez zalezności od ich konkretnych klas.
 */
function clientCode2(component1, component2) {
    // ...
    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log("RESULT: ".concat(component1.operation()));
    // ...
}
console.log("Client: I don't need to check the components classes even when managing the tree:");
clientCode2(tree, simple);
