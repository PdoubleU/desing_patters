interface ICargoStrategy<T> {
  SelectPallet(cargo: T): void;
}

interface ICargoPreparation {
  setStrategy<T>(strategy: ICargoStrategy<T>): void;
  prepareCargo<T>(cargo: T): void;
}

class CargoPreparation implements ICargoPreparation {
  private _strategy: ICargoStrategy<any>;

  setStrategy<T>(strategy: ICargoStrategy<T>): void {
    this._strategy = strategy;
  }

  prepareCargo<T>(cargo: T): void {
    this._strategy.SelectPallet(cargo);
  }
}

interface ICargo {
  Type: string;
  MaxWeight: number;
  MaxHeight: number;
}

class PrepareEPallet implements ICargo {
  Type: string = "EPallet";
  MaxWeight: number = 1000;
  MaxHeight: number = 2000;
}

class PrepareStingerPallet implements ICargo {
  Type: string = "StingerPallet";
  MaxWeight: number = 500;
  MaxHeight: number = 1000;
}

class ConcreteCargoStrategyEPallet implements ICargoStrategy<PrepareEPallet> {
  SelectPallet(cargo: PrepareEPallet): void {
    console.log(
      `Selected pallet for ${cargo.Type} with max weight ${cargo.MaxWeight} and max height ${cargo.MaxHeight}`
    );
  }
}

class ConcreteCargoStrategyStingerPallet
  implements ICargoStrategy<PrepareStingerPallet>
{
  SelectPallet(cargo: PrepareStingerPallet): void {
    console.log(
      `Selected pallet for ${cargo.Type} with max weight ${cargo.MaxWeight} and max height ${cargo.MaxHeight}`
    );
  }
}

class Client {
  Main(): void {
    const ctx: ICargoPreparation = new CargoPreparation();
    console.log("Prepare Stinger Pallet");
    ctx.setStrategy(new ConcreteCargoStrategyEPallet());
    ctx.prepareCargo(new PrepareEPallet());
  }
}
