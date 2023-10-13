/**
 * problemem, ktory rozwiazuje wzorzec prototypu jest tworzenie nowych obiektow przez kopiowanie istniejacych
 * zamiast tworzenia nowych obiektow przez konstruktory i kopiowaniu ich pol
 */
class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    console.log(this);
    // metoda statyczna Object.create() tworzy nowy obiekt na podstawie podanego prototypu
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    // kopiowanie obiektu z referencja cykliczna
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

/**
 * The client code.
 */
function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log("Pola z wartosciami prymitywnymi udalo sie skopiowac.");
  } else {
    console.log(
      "Niestety pola z wartosciami prymitywnymi nie udalo sie skopiowac."
    );
  }
  if (p1.component === p2.component) {
    console.log("Obiekt zlozony nie zostal skopiowany");
  } else {
    console.log("Obiekt zlozony zostal skopiowany.");
  }

  if (p1.circularReference === p2.circularReference) {
    console.log("Komponent z referencja cykliczna nie zostal skopiowany");
  } else {
    console.log("Komponent z referencja cykliczna zostal skopiowany");
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log(
      "Komponent z referencja cykliczna ma referencje do oryginalnego obiektu."
    );
  } else {
    console.log(
      "Komponent z referencja cykliczna ma referencje do sklonowanego obiektu."
    );
  }
}

clientCode();
