var CargoPreparation = /** @class */ (function () {
    function CargoPreparation() {
    }
    CargoPreparation.prototype.setStrategy = function (strategy) {
        this._strategy = strategy;
    };
    CargoPreparation.prototype.prepareCargo = function (cargo) {
        this._strategy.SelectPallet(cargo);
    };
    return CargoPreparation;
}());
var PrepareEPallet = /** @class */ (function () {
    function PrepareEPallet() {
        this.Type = "EPallet";
        this.MaxWeight = 1000;
        this.MaxHeight = 2000;
    }
    return PrepareEPallet;
}());
var PrepareStingerPallet = /** @class */ (function () {
    function PrepareStingerPallet() {
        this.Type = "StingerPallet";
        this.MaxWeight = 500;
        this.MaxHeight = 1000;
    }
    return PrepareStingerPallet;
}());
var ConcreteCargoStrategyEPallet = /** @class */ (function () {
    function ConcreteCargoStrategyEPallet() {
    }
    ConcreteCargoStrategyEPallet.prototype.SelectPallet = function (cargo) {
        console.log("Selected pallet for ".concat(cargo.Type, " with max weight ").concat(cargo.MaxWeight, " and max height ").concat(cargo.MaxHeight));
    };
    return ConcreteCargoStrategyEPallet;
}());
var ConcreteCargoStrategyStingerPallet = /** @class */ (function () {
    function ConcreteCargoStrategyStingerPallet() {
    }
    ConcreteCargoStrategyStingerPallet.prototype.SelectPallet = function (cargo) {
        console.log("Selected pallet for ".concat(cargo.Type, " with max weight ").concat(cargo.MaxWeight, " and max height ").concat(cargo.MaxHeight));
    };
    return ConcreteCargoStrategyStingerPallet;
}());
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.Main = function () {
        var ctx = new CargoPreparation();
        console.log("Prepare Stinger Pallet");
        ctx.setStrategy(new ConcreteCargoStrategyEPallet());
        ctx.prepareCargo(new PrepareEPallet());
    };
    return Client;
}());
