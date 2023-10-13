/**
 * podstawowy interfejs Komponentu deklaruje operacje, które mogą być
 * wykonane zarówno dla prostych jak i złożonych obiektów w strukturze
 */
abstract class Component {
  protected parent!: Component | null;
  /**
   * opcjonalnie Komponent bazowy może deklarować interfejs ustawiania i
   * dostępu do rodzica komponentu w strukturze drzewa. Może również
   * zapewnić domyślną implementację tych metod
   */
  public setParent(parent: Component | null) {
    this.parent = parent;
  }
  public getParent(): Component | null {
    return this.parent;
  }
  /**
   * w niektórych przypadkach byłoby korzystne zdefiniowanie operacji
   * zarządzania dziećmi bezpośrednio w klasie bazowej Komponentu. W ten
   * sposób nie będziesz musiał ujawniać żadnych konkretnych klas
   * komponentów klientowi, nawet podczas składania drzewa obiektów. Wadą
   * jest to, że te metody będą puste dla komponentów liści.
   */
  public add(component: Component): void {}

  public remove(component: Component): void {}
  /**
   * Możesz zapewnić metodę, która pozwala klientowi zrozumieć, czy dany
   * komponent może mieć dzieci
   */
  public isComposite(): boolean {
    return false;
  }
  /**
   * Komponent bazowy może implementować pewne domyślne zachowanie lub
   * pozostawić je klasom konkretnym (poprzez deklarowanie metody zawierającej
   * zachowanie jako "abstrakcyjne").
   */
  public abstract operation(): string;
}
/**
 * klasa Liść reprezentuje obiekty końcowe w strukturze. Liść nie może mieć
 * żadnych dzieci.
 *
 * Zwykle to obiekty Liść wykonują rzeczywistą pracę, podczas gdy obiekty
 * Kompozytu jedynie delegują do swoich podkomponentów.
 */
class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}
/**
 * Klasa Kompozyt reprezentuje złożone komponenty, które mogą mieć dzieci.
 * Zwykle obiekty Kompozytu delegują rzeczywistą pracę swoim dzieciom, a
 * następnie "sumują" wyniki.
 */
class Composite extends Component {
  protected children: Component[] = [];
  /**
   * Kompozyt może dodać lub usunąć inne komponenty (zarówno proste jak i
   * złożone) do lub z swojej listy dzieci.
   */
  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }
  /**
   * Kompozyt wykonuje swoją główną logikę w okreslony sposób. Przechodzi
   * rekursywnie przez wszystkie swoje dzieci, zbierając i sumując ich
   * wyniki. Ponieważ dzieci Kompozytu przekazują te wywołania do swoich
   * dzieci i tak dalej, całe drzewo obiektów jest przetwarzane jako
   * wynik.
   */
  public operation(): string {
    const results = [];
    for (const child of this.children) {
      results.push(child.operation());
    }

    return `Branch(${results.join("+")})`;
  }
}

/**
 * kod klienta działa z wszystkimi komponentami za pośrednictwem interfejsu
 */
function clientCode(component: Component) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}
/**
 * w ten sposób kod klienta wspiera zarówno proste komponenty liscie...
 */
const simple = new Leaf();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");

/**
 * oraz zlozone struktury drzewiaste.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log("Client: Now I've got a composite tree:");
clientCode(tree);
console.log("");

/**
 * z uwagi na fakt, ze operacje zarzadzania dziecmi sa zdefiniowane w klasie
 * bazowej Komponentu, kod klienta moze pracowac z dowolnym komponentem, prostym
 * lub zlozonym, bez zalezności od ich konkretnych klas.
 */
function clientCode2(component1: Component, component2: Component) {
  // ...
  if (component1.isComposite()) {
    component1.add(component2);
  }
  console.log(`RESULT: ${component1.operation()}`);
  // ...
}

console.log(
  "Client: I don't need to check the components classes even when managing the tree:"
);
clientCode2(tree, simple);
