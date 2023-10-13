/**
 * bazowy interfejs Komponentu definiuje operacje, które mogą być zmodyfikowane
 * przez dekoratory
 */
interface Component {
  operation(): string;
}
/**
 * konretne komponenty zapewniają domyślne implementacje operacji. Może być
 * wiele wariantów tych klas
 */
class BaseComponent implements Component {
  public operation(): string {
    return "BaseComponent";
  }
}
/**
 * Dekorator bazowy posiada ten sam interfejs co inne komponenty. Głównym
 * celem tej klasy jest zdefiniowanie interfejsu opakowania dla wszystkich
 * konkretnych dekoratorów. Domyślna implementacja opakowania może włączać
 * pole do przechowywania zapakowanego komponentu oraz metody jego
 * inicjalizacji.
 */
class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }
  /**
   * dekorator deleguje wszystkie operacje do zapakowanego komponentu
   */
  public operation(): string {
    return this.component.operation();
  }
}
/**
 * konkretne dekoratory wywoluja opakowany obiekt i modyfikują jego wynik w okreslony sobie sposób
 */
class UpgradedDecorator extends Decorator {
  /**
   * dekorator moze wywolac implementacje operacji rodzica, zamiast wywolywac
   * obiekt bezposrednio. Ten podejscie upraszcza rozszerzanie klas
   * dekoratorow
   */
  public operation(): string {
    return `UpgradedDecorator(${super.operation()})`;
  }
}

/**
 * dekoratory moga wywolac swoje metody przed lub po wywolaniu odpowiednich
 * metod zapakowanego obiektu
 */
class MasterDecorator extends Decorator {
  public operation(): string {
    return `MasterDecorator(${super.operation()})`;
  }
}

/**
 * kod klienta dziala ze wszystkimi obiektami implementujacymi interfejs Komponentu.
 * W ten sposob moze pozostac niezalezny od klas konkretnych komponentow z ktorymi pracuje
 */
function clientCode(component: Component) {
  // ...
  console.log(`RESULT: ${component.operation()}`);
  // ...
}

/**
 * w ten sposob kod klienta moze wspierac zarowno proste komponenty...
 */
const simple = new BaseComponent();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");

/**
 * ...jak i zapakowane w dekoratory.
 *
 * zauwazmy, jak dekoratory moga zapakowac nie tylko proste komponenty, ale rowniez inne dekoratory.
 */
const decorator1 = new UpgradedDecorator(simple);
const decorator2 = new MasterDecorator(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
