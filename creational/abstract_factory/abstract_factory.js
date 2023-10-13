// konretne fabryki tworza produkty nalezace do danego wariantu tematycznego
// fabryka konkretna gwarantuje, ze produkty, ktore tworzy sa zgodne ze soba
var AndroidFactory = /** @class */ (function () {
    function AndroidFactory() {
    }
    AndroidFactory.prototype.createButton = function () {
        return new AndroidButton();
    };
    AndroidFactory.prototype.createCheckbox = function () {
        return new AndroidCheckbox();
    };
    return AndroidFactory;
}());
var IOSFactory = /** @class */ (function () {
    function IOSFactory() {
    }
    IOSFactory.prototype.createButton = function () {
        return new IOSButton();
    };
    IOSFactory.prototype.createCheckbox = function () {
        return new IOSCheckbox();
    };
    return IOSFactory;
}());
var AndroidButton = /** @class */ (function () {
    function AndroidButton() {
        // implementacja specificzna dla androida
        this.name = "AndroidButton";
    }
    AndroidButton.prototype.defaultMethod = function () {
        return "AndroidButton";
    };
    return AndroidButton;
}());
var IOSButton = /** @class */ (function () {
    function IOSButton() {
        // implementacja specificzna dla ios
        this.name = "IOSButton";
    }
    IOSButton.prototype.defaultMethod = function () {
        return "IOSButton";
    };
    return IOSButton;
}());
var AndroidCheckbox = /** @class */ (function () {
    function AndroidCheckbox() {
        // implementacja specificzna dla androida
        this.name = "AndroidCheckbox";
    }
    AndroidCheckbox.prototype.defaultMethod = function () {
        return "AndroidCheckbox";
    };
    AndroidCheckbox.prototype.customMethod = function (collaborator) {
        var result = collaborator.defaultMethod();
        return "The result of the AndroidCheckbox collaborating with the (".concat(result, ")");
    };
    return AndroidCheckbox;
}());
var IOSCheckbox = /** @class */ (function () {
    function IOSCheckbox() {
        // implementacja specificzna dla ios
        this.name = "IOSCheckbox";
    }
    IOSCheckbox.prototype.defaultMethod = function () {
        return "IOSCheckbox";
    };
    IOSCheckbox.prototype.customMethod = function (collaborator) {
        var result = collaborator.defaultMethod();
        return "The result of the B2 collaborating with the (".concat(result, ")");
    };
    return IOSCheckbox;
}());
function clientCode(factory) {
    var button = factory.createButton();
    var checkbox = factory.createCheckbox();
    console.log(checkbox.defaultMethod());
    console.log(checkbox.customMethod(button));
}
console.log("Android platform");
clientCode(new AndroidFactory());
console.log("IOS platform");
clientCode(new IOSFactory());
