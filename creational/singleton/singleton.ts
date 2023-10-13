/**
 * Singleton gwarantuje, że klasa ma tylko jedną instancję, a do tego dostarcza globalny punkt dostępu do niej.
 */
class Singleton {
  private static instance: Singleton;

  /**
   * konstruktor Singleton nie może być publiczny, ponieważ wtedy można by było utworzyć więcej niż jedną instancję klasy.
   */
  private constructor() {}

  /**
   * statyczna metoda, która służy do utworzenia lub pobrania instancji Singletona.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  /**
   * oczywiscie Singleton bez logiki nie ma sensu, więc powinien implementować jakąś logikę biznesową, która jest wykonywana na jego instancji.
   * np. połaczenie ze strumieniem danych, połączenie z bazą danych, itp.
   */
  public someBusinessLogic() {
    // ...
  }
}

/**
 * wywołanie metody statycznej getInstance() powinno zwrócić tę samą instancję Singletona, ponieważ jest to ta sama instancja.
 * bez względu na to, ile razy wywołamy metodę getInstance(), zawsze zwróci tę samą instancję.
 */
function clientCode() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log("Singleton działa, obie zmienne zawierają tę samą instancję.");
  } else {
    console.log(
      "Singleton nie działa, obie zmienne zawierają różne instancje."
    );
  }
}

clientCode();
