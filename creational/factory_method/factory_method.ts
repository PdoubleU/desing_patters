/**
 * metoda wytwórcza stosowany w celu zdefiniowania interfejsu do tworzenia
 * obiektów, ale pozostawiający podklasom decyzję o tym, które klasy instancjonować.
 * Wzorzec metoda wytwórcza definiuje metodę, która powinna być użyta zamiast
 * bezpośredniego wywołania konstruktora klasy (operator new). Podklasy mogą
 * przesłaniać tę metodę, aby zmienić klasę obiektu, który zostanie utworzony.
 */
abstract class Creator {
  /**
   * domyślna implementacja metody fabrycznej, która zwraca obiekt typu Product
   */
  public abstract factoryMethod(): Product;
  /**
   * metoda fabryczna moze definiowac logike domyslna, ktora moze byc
   * nadpisana przez podklasy
   */
  public someOperation(): string {
    // w tym przykładzie creator odwoluje sie do metody fabrycznej, aby
    // uzyskac obiekt typu Product
    const product = this.factoryMethod();
    // nastepnie produkt moze byc uzyty w dowolny sposob
    return `Ten sam twórca własnie zadziałał z ${product.apiURL()}`;
  }
}
/**
 * konkretni tworcy przeslaniaja metode fabryczna, aby zmienic typ zwracanego
 * produktu
 */
class CreateTestAPI extends Creator {
  /**
   * Uwaga, ze sygnatura metody nadpisanej nadal uzywa typu abstrakcyjnego
   * produktu, chociaz faktyczna implementacja zwraca konkretny produkt.
   * W ten sposób metoda fabryczna pozostaje niezależna od konkretnych klas
   * produktów.
   */
  public factoryMethod(): Product {
    return new TestAPI();
  }
}

class CreateProductionAPI extends Creator {
  public factoryMethod(): Product {
    return new ProductionAPI();
  }
}
/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 */
interface Product {
  apiURL(): string;
}
/**
 * Concrete Products provide various implementations of the Product interface.
 */
class TestAPI implements Product {
  public apiURL(): string {
    return "{TestAPI}";
  }
}

class ProductionAPI implements Product {
  public apiURL(): string {
    return "{ProductionAPI}";
  }
}
/**
 * kod kliencki dziala z instancjami konkretnych klas tworcow, chociaz przez
 * interfejs abstrakcyjny Creator. Dzieki temu, ze klasa aplikacji jest
 * skonfigurowana z jednym z konkretnych tworcow, nie musi ona tworzyc
 * instancji konkretnych produktow, poniewaz metoda fabryczna jest juz
 * zaimplementowana w klasie tworcy abstrakcyjnego
 */
function clientCode(creator: Creator) {
  // ...
  console.log(
    "Nie jestem swiadom klasy twórcy', ale jestem w stanie go użyć dzięki interfejsowi"
  );
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
