public interface IInvoiceFactory
{
    ISellerData CreateSellerData();
    IBuyerData CreateBuyerData();
    IPurchase CreatePurchase();
}

// fabryka dla Niemiec
public class GermanInvoiceFactory : IInvoiceFactory
{
    public ISellerData CreateSellerData()
    {
        return new GermanSellerData();
    }

    public IBuyerData CreateBuyerData()
    {
        return new GermanBuyerData();
    }

    public IPurchase CreatePurchase()
    {
        return new GermanPurchase();
    }
}


// fabryka dla Polski
public class PolishInvoiceFactory : IInvoiceFactory
{
    public ISellerData CreateSellerData()
    {
        return new PolishSellerData();
    }

    public IBuyerData CreateBuyerData()
    {
        return new PolishBuyerData();
    }

    public IPurchase CreatePurchase()
    {
        return new PolishPurchase();
    }
}

public interface ISellerData
{
    string Name { get; }
    string Address { get; }
    string TaxId { get; }
}

public class GermanSellerData : ISellerData
{
    // specyficzna implementacja dla Niemiec (przykladowa)
    public string Name => "Nazwa firmy wygenerowana wg. niemieckiego wzoru";
    public string Address => "Adres firmy wygenerowany wg. niemieckiego wzoru";
    public string TaxId => "Numer identyfikacji podatkowej wygenerowany wg. niemieckiego wzoru";
}

public class PolishSellerData : ISellerData
{
    // specyficzna implementacja dla Polski (przykladowa)
    public string Name => "Polski wzór nazwy firmy sprzedającej";
    public string Address => "Polski wzór adresu firmy sprzedającej";
    public string TaxId => "Specyficzny dla Polski zapis numeru identyfikacji podatkowej";
}

public interface IBuyerData
{
    string Name { get; }
    string Address { get; }
    string TaxId { get; }
}

public class GermanBuyerData : IBuyerData
{
    // specyficzna implementacja dla Niemiec (przykladowa)
    public string Name => "Niemiecki wzór nazwy firmy kupującej";
    public string Address => "Niemiecki wzór adresu firmy kupującej";
    public string TaxId => "Specyficzny dla Niemiec zapis numeru identyfikacji podatkowej";
}

public class PolishBuyerData : IBuyerData
{
    // specyficzna implementacja dla Polski (przykladowa)
    public string Name => "Polski wzór nazwy firmy kupującej";
    public string Address => "Polski wzór adresu firmy kupującej";
    public string TaxId => "Specyficzny dla Polski zapis numeru identyfikacji podatkowej";
}

public interface IPurchase
{
    string Name { get; }
    decimal Price { get; }
    int Quantity { get; }
    decimal GetTotalPrice();
}

public class GermanPurchase : IPurchase
{
    // specyficzna implementacja dla Niemiec (przykladowa)
    public string Name => "Niemiecki wzór nazwy produktu";
    public decimal Price => 100m;
    public int Quantity => 1;
    public decimal GetTotalPrice() => Price * Quantity;
}

public class PolishPurchase : IPurchase
{
    // specyficzna implementacja dla Polski (przykladowa)
    public string Name => "Polski wzór nazwy produktu";
    public decimal Price => 100m;
    public int Quantity => 1;
    public decimal GetTotalPrice() => Price * Quantity;
}

public class Invoice
{
    // mozliwy sposob wykorzystania fabryki abstrakcyjnej
    private readonly ISellerData _sellerData;
    private readonly IBuyerData _buyerData;
    private readonly IPurchase _purchase;

    public Invoice(IInvoiceFactory factory)
    {
        _sellerData = factory.CreateSellerData();
        _buyerData = factory.CreateBuyerData();
        _purchase = factory.CreatePurchase();
    }

    public void Print()
    {
        Console.WriteLine($"Sprzedawca: {_sellerData.Name}, {_sellerData.Address}, {_sellerData.TaxId}");
        Console.WriteLine($"Nabywca: {_buyerData.Name}, {_buyerData.Address}, {_buyerData.TaxId}");
        Console.WriteLine($"Produkt: {_purchase.Name}, {_purchase.Price}, {_purchase.Quantity}, {_purchase.GetTotalPrice()}");
    }
}
