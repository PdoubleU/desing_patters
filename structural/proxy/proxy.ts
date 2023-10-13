/**
 * proxy pozwala na kontrolowanie dostępu do obiektu
 */
interface Subject {
  request(): void;
}
/**
 * docelowy obiekt moze posiadac zlozona logike i wykonywac wiele wymagajacych operacji
 * proxy moze byc uzyte do kontrolowania dostepu do tego obiektu i wykonywania dodatkowych operacji zanim zostanie wywolana metoda docelowego obiektu
 */
class RealSubject implements Subject {
  public request(): void {
    console.log("RealSubject: przetwarzanie zadania.");
  }
}
/**
 * proxy implementuje interfejs docelowego obiektu
 */
class CustomProxy implements Subject {
  private realSubject: RealSubject;
  /**
   * proxy przechowuje referencje do obiektu docelowego i moze go tworzyc lub przekazywac przez konstruktor
   * proxy moze ladowane lazy-loading i tworzyc obiekt docelowy tylko wtedy gdy jest to wymagane lub otrzymywac obiekt docelowy z zewnatrz od klienta
   */
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }
  /**
   * proxy wykorzystuje sie zwykle do lazy-loading, cachowania, kontrolowania dostepu, logowania itp.
   * proxy wykonuje te czynnosci i w zaleznosci od wyniku przekazuje wykonanie do metody w obiekcie docelowym
   */
  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }
  private checkAccess(): boolean {
    // metoda sprawdza czy uzytkownik ma dostep do obiektu docelowego
    console.log(
      "Proxy: sprawdzanie dostepu przed przekazaniem zadania do RealSubject."
    );
    // powinno zwracac true lub false w zaleznosci od tego czy uzytkownik ma dostep do obiektu docelowego
    return true;
  }
  private logAccess(): void {
    console.log("Proxy: logowanie czasu wykonania zadania.");
  }
}
/**
 * kod klienta powinien pracowac ze wszystkimi obiektami (zarowno z podmiotami jak i proxy) za pomoca interfejsu Subject
 * w celu wspierania zarowno docelowych obiektów jak i proxy
 * w rzeczywistosci jednak klienci najczesciej pracuja bezposrednio z obiektami docelowymi
 * w takim przypadku, aby latwiej zaimplementowac wzorzec, mozna rozszerzyc proxy z klasy obiektu docelowego
 */
function clientCode(subject: Subject) {
  // ...
  subject.request();
  // ...
}

console.log("Client: Wywolanie kodu klienta z rzeczywistym obiektem:");
const realSubject = new RealSubject();
clientCode(realSubject);

console.log("");

console.log("Client: Wywolanie kodu klienta z proxy:");
const proxy = new CustomProxy(realSubject);
clientCode(proxy);
