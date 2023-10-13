/**
 * interfejs budowniczego deklaruje kroki konstrukcji produktu, wspolne dla wszystkich rodzajow budowniczych
 */
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}
/**
 * konretna klasa implementujaca interfejs budowniczego
 * dostarcza implementacje krokow konstrukcji produktu
 */
class ControlPanelViewBuilder implements Builder {
  private product: ControlPanelView;
  /**
   * nowa instancja budowniczego powinna zawierac pusty obiekt produktu, ktory jest uzywany w dalszej konstrukcji
   * stad w konstruktorze wywolujemy metode resetujaca produkt
   */
  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new ControlPanelView();
  }
  /**
   * implementacja metod interfejsu budowniczego
   */
  public producePartA(): void {
    this.product.parts.push("Header");
  }
  public producePartB(): void {
    this.product.parts.push("ControlsButtons");
  }
  public producePartC(): void {
    this.product.parts.push("AdminSection");
  }
  /**
   * produkty konkretnych budowniczych nie zawsze musza miec wspolny interfejs
   * poniewaz mogą tworzyć produkty o różnych interfejsach
   * dlatego metoda getProduct() nie jest częścią interfejsu budowniczego a specyficzna dla konkretnej klasy budowniczego
   *
   * po stworzeniu produktu (zwróceniu go do kodu klienckiego) budowniczy powinien być gotowy do rozpoczęcia produkcji następnego produktu
   */
  public getProduct(): ControlPanelView {
    const result = this.product;
    this.reset();
    return result;
  }
}
/**
 * ten wzorzec jest przydatny przy tworzeniu skomplikowanych obiektów
 * rozni się od fabryki abstrakcyjnej tym, że fabryka abstrakcyjna tworzy produkty w jednym kroku, a budowniczy w wielu krokach
 * oraz tym, że budowniczy pozwala na tworzenie produktów o różnych interfejsach
 */
class ControlPanelView {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Lista elementów: ${this.parts.join(", ")}\n`);
  }
}
/**
 * jesli tworzenie produktu wymaga skomplikowanych krokow, mozna zaimplementowac kroki w osobnej klasie kierownika
 */
class Director {
  private builder: Builder;
  /**
   * kierownik nie jest zależny od konkretnych klas budowniczego
   * dlatego parametr metody setBuilder() powinien przyjmować interfejs budowniczego
   */
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }
  /**
   * kierownik moze implementowac metody kierujace krokami konstrukcji produktu
   */
  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }
  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}
/**
 * korzystanie z budowniczego moze odbyc sie na dwa sposoby:
 * 1. posrednio za pomoca kierownika i wykonanie sekwencji krokow konstrukcji produktu bez wiedzy o tej sekwencji
 * 2. bezposrednio, bez kierownika, gdy kod kliencki chce kontrolowac krok konstrukcji produktu
 */
function clientCode(director: Director) {
  const builder = new ControlPanelViewBuilder();
  director.setBuilder(builder);

  console.log("Podstawowy produkt:");
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log("Pełny produkt:");
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  // mozna tez wywolac metody budowniczego bezposrednio
  console.log("Produkt kustomizowany:");
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
