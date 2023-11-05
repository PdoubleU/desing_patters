using System;

public interface ICargoStrategy<T>
{
    void SelectPallet(T cargo);
}

public interface ICargoPreparation
{
    void SetStrategy<T>(ICargoStrategy<T> strategy);
    void PrepareCargo<T>(T cargo);
}

public class CargoPreparation : ICargoPreparation
{
    private ICargoStrategy<object> _strategy;

    public void SetStrategy<T>(ICargoStrategy<T> strategy)
    {
        _strategy = strategy;
    }

    public void PrepareCargo<T>(T cargo)
    {
        _strategy.SelectPallet(cargo);
    }
}

public interface ICargo
{
    string Type { get; }
    int MaxWeight { get; }
    int MaxHeight { get; }
}

public class PrepareEPallet : ICargo
{
    public string Type => "EPallet";
    public int MaxWeight => 1000;
    public int MaxHeight => 2000;
}

public class PrepareStingerPallet : ICargo
{
    public string Type => "StingerPallet";
    public int MaxWeight => 500;
    public int MaxHeight => 1000;
}

public class ConcreteCargoStrategyEPallet : ICargoStrategy<PrepareEPallet>
{
    public void SelectPallet(PrepareEPallet cargo)
    {
        Console.WriteLine($"Selected pallet for {cargo.Type} with max weight {cargo.MaxWeight} and max height {cargo.MaxHeight}");
    }
}

public class ConcreteCargoStrategyStingerPallet : ICargoStrategy<PrepareStingerPallet>
{
    public void SelectPallet(PrepareStingerPallet cargo)
    {
        Console.WriteLine($"Selected pallet for {cargo.Type} with max weight {cargo.MaxWeight} and max height {cargo.MaxHeight}");
    }
}

public class Client
{
    public void Main()
    {
        var ctx = new CargoPreparation();
        ctx.SetStrategy(new ConcreteCargoStrategyEPallet());
        ctx.PrepareCargo(new PrepareEPallet());
    }
}