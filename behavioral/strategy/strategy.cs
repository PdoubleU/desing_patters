using System;

interface ICargoStrategy
{
    void SelectPallet(ICargo cargo);
}

interface ICargoPreparation
{
    void SetStrategy(ICargoStrategy strategy);
    void PrepareCargo(ICargo cargo);
}

class CargoPreparation : ICargoPreparation
{
    private ICargoStrategy _strategy;

    public void SetStrategy(ICargoStrategy strategy)
    {
        _strategy = strategy;
    }

    public void PrepareCargo(ICargo cargo)
    {
        _strategy.SelectPallet(cargo);
    }
}

interface ICargo
{
    string Type { get; }
    int MaxWeight { get; }
    int MaxHeight { get; }
}

class PrepareEPallet : ICargo
{
    public string Type => "EPallet";
    public int MaxWeight => 1000;
    public int MaxHeight => 2000;
}

class PrepareStingerPallet : ICargo
{
    public string Type => "StingerPallet";
    public int MaxWeight => 500;
    public int MaxHeight => 1000;
}

class ConcreteCargoStrategyEPallet : ICargoStrategy
{
    public void SelectPallet(ICargo cargo)
    {
        Console.WriteLine($"Selected pallet for {cargo.Type} with max weight {cargo.MaxWeight} and max height {cargo.MaxHeight}");
    }
}

class ConcreteCargoStrategyStingerPallet : ICargoStrategy
{
    public void SelectPallet(ICargo cargo)
    {
        Console.WriteLine($"Selected pallet for {cargo.Type} with max weight {cargo.MaxWeight} and max height {cargo.MaxHeight}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("Prepare strategy");
        var ctx = new CargoPreparation(); 
        Console.WriteLine("Prepare strategy for E-pallet");
        ctx.SetStrategy(new ConcreteCargoStrategyEPallet());
        Console.WriteLine("Execute strategy for E-pallet");
        ctx.PrepareCargo(new PrepareEPallet());
        Console.ReadLine();
        Console.WriteLine("Prepare strategy for Stinger pallet");
        ctx.SetStrategy(new ConcreteCargoStrategyStingerPallet());
        Console.WriteLine("Execute strategy for Stinger pallet");
        ctx.PrepareCargo(new PrepareStingerPallet());
        Console.ReadLine();
    }
}