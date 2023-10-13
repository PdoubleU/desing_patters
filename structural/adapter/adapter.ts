/**
 * definiujemy klasę docelowa, ktora ma swoj interfejs
 */
class Target {
  public request(): string {
    return "Target: The default target's behavior.";
  }
}
/**
 * serwis posiada swoje wlasne funkcjonalnosci, ktore jest niezgodne z interfejsem docelowym
 */
class Service {
  public specificRequest(): string {
    return ".eetpadA eht fo roivaheb laicepS";
  }
}
/**
 * adapter pozwala na wykorzystanie funkcjonalnosci serwisu przez klienta
 */
class Adapter extends Target {
  private service: Service;

  constructor(service: Service) {
    super();
    this.service = service;
  }

  public request(): string {
    // trywialny przykład, ale może być dowolna logika, jak konwersja danych, formatu, itp.
    const result = this.service.specificRequest().split("").reverse().join("");
    return `Adapter: (TRANSLATED) ${result}`;
  }
}
/**
 * kod klienta wspiera wszystkie klasy, ktore implementuja interfejs Target
 */
function clientCode(target: Target) {
  console.log(target.request());
}

console.log("Client: Pracuję dobrze z instancjami klasy Target:");
const target = new Target();
clientCode(target);

console.log("");

const service = new Service();
console.log("Client: klasa Service ma niezrozumialy interfejs.");
console.log(`Service: ${service.specificRequest()}`);

console.log("");

console.log("Client: Adapter pozwala na adaptację do docelowego interfejsu:");
const adapter = new Adapter(service);
clientCode(adapter);
