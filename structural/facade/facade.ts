/**
 * fasada to klasa dostarczajaca prosty interfejs do zlozonego systemu
 * deleguje zapytania klienta do odpowiednich obiektow w systemie
 * dodatkowo zarzadza ich zyciem
 * ukrywa skomplikowany system za prostym interfejsem
 */
class Facade {
  protected subsystem1: Subsystem1;

  protected subsystem2: Subsystem2;
  /**
   * w zaleznosci od potrzeb, fasada moze tworzyc obiekty podsystemu lub otrzymywac je z zewnatrz
   */
  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  /**
   * Fasada posiada wygodne metody do szybkiego dostepu do zlozonego systemu
   * jednak klienci moga korzystac tylko z czesci funkcjonalnosci systemu
   */
  public operation(): string {
    let result = "Inicjalizacja podsystemów:\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += "Facada zada wykonania operacji:\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();

    return result;
  }
}

/**
 * w tym wzorcu systemy akceptujace zapytania od fasady lub bezposrednio od klienta sa traktowane tak samo
 * systemy nie odrozniaja klienta od fasady
 */
class Subsystem1 {
  public operation1(): string {
    return "Subsystem1: Gotowy!\n";
  }
  // ...
  public operationN(): string {
    return "Subsystem1: Start!\n";
  }
}
/**
 * niektore fasady moga pracowac z wieloma podsystemami jednoczesnie
 */
class Subsystem2 {
  public operation1(): string {
    return "Subsystem2: Przygotuj się!\n";
  }
  // ...
  public operationZ(): string {
    return "Subsystem2: Ognia!";
  }
}
/**
 * kod klienta pracuje z prostym interfejsem fasady zamiast bezposrednio z podsystemami (i komplikowac tym samym swoj kod i zycie)
 */
function clientCode(facade: Facade) {
  // ...
  console.log(facade.operation());
  // ...
}
/**
 * kod klienta moze miec swoje wlasne obiekty podsystemu
 * w takmi przypadku mozna przekazac ich instancje do fasady
 */
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
