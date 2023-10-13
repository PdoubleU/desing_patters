/**
 * Abstrakcja (nie mylić z klasa abstrakcyjna) definiuje interfejs sterowania
 * dla dwoch hierarchii klas. Utrzymuje referencje do obiektu z hierarchii implementacji
 * i deleguje wszystkie rzeczywiste zadania do tego obiektu.
 */
class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstrakcja: Podstawowa operacja z:\n${result}`;
  }
}
/**
 * Możesz rozszerzyć Abstraction bez zmiany klas implementacji.
 */
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Rozszerzona abstrakcja: Rozszerzona operacja z:\n${result}`;
  }
}
/**
 * implementacja definiuje interfejs dla wszystkich klas implementacji
 * nie musi on być zgodny z interfejsem Abstraction. W rzeczywistości dwa interfejsy
 * mogą być całkowicie różne. Zwykle interfejs implementacji dostarcza tylko operacji
 * prymitywnych, podczas gdy Abstraction definiuje operacje wyższego poziomu oparte na tych prymitywach.
 */
interface Implementation {
  operationImplementation(): string;
}
/**
 * kazda konkretna implementacja odpowiada konkretnemu systemowi i implementuje interfejs
 * za pomocą API tego systemu
 */
class AndroidImplementation implements Implementation {
  public operationImplementation(): string {
    return "AndroidImplementation: Wynik działania platformy Android.";
  }
}

class IOSImplementation implements Implementation {
  public operationImplementation(): string {
    return "IOSImplementation: Wynik działania platformy IOS.";
  }
}
/**
 * z wylaczeniem fazy inicjalizacji, gdzie obiekt Abstraction jest powiazany z konkretnym obiektem implementacji
 * kod klienta powinien zalezec tylko od klasy Abstraction. W ten sposób kod klienta moze obslugiwac dowolna kombinacje
 * abstrakcja-implementacja
 */
function clientCode(abstraction: Abstraction) {
  // ..
  console.log(abstraction.operation());
  // ..
}
/**
 * kod klienta powinien pracowac z dowolna kombinacja konfiguracją abstrakcja-implementacja
 */
let implementation = new AndroidImplementation();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log("");

implementation = new IOSImplementation();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
