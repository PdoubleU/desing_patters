using System;

interface ICargoStrategy
{
    void SelectPallet();
}

interface ICargoPreparation
{
    void SetStrategy(ICargoStrategy strategy);
    void PrepareCargo();
}

class CargoPreparation : ICargoPreparation
{
    private ICargoStrategy _strategy;

    public void SetStrategy(ICargoStrategy strategy)
    {
        _strategy = strategy;
    }

    public void PrepareCargo()
    {
        _strategy.SelectPallet();
    }
}

interface ICargo
{
    string Type { get; }
    int MaxWeight { get; }
    int MaxHeight { get; }
}

class ConcreteCargoStrategyEPallet : ICargoStrategy
{
    public void SelectPallet()
    {
        Console.WriteLine("Selected pallet for EPallet with max weight 800kg and max height 4500mm");
    }
}

class ConcreteCargoStrategyStingerPallet : ICargoStrategy
{
    public void SelectPallet()
    {
        Console.WriteLine("Selected pallet for StingerPallet with max weight 1000kg and max height 5000mm");
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
        ctx.PrepareCargo();
        Console.ReadLine();
        Console.WriteLine("Prepare strategy for Stinger pallet");
        ctx.SetStrategy(new ConcreteCargoStrategyStingerPallet());
        Console.WriteLine("Execute strategy for Stinger pallet");
        ctx.PrepareCargo();
        Console.ReadLine();
    }
}